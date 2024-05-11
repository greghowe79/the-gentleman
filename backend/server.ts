import express, { Express } from 'express';
import type { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import { CartProps, Product, ProductDetailsProps } from './types/types';
import querystring from 'node:querystring';
import { v4 as uuidv4 } from 'uuid';
import { calculateTotalAmountBySeller } from './actions';
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// Determine root domain

let rootDomain = process.env.NODE_ENV == 'development' ? process.env.ROOT_DOMAIN_DEV : process.env.ROOT_DOMAIN_PROD;

const app: Express = express();
const port = 3005;
const route = '/api_v1';

app.use(cookieparser());
app.use(cors({ origin: rootDomain, credentials: true }));
app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL!;

const supabaseANonPublic = process.env.SUPABASE_SECRET_KEY!;

const supabase = createClient(supabaseUrl, supabaseANonPublic);

function generateUniqueString() {
  const timestamp = Date.now();
  const uuid = uuidv4();

  return `UNIQUE_${timestamp}_${uuid}`;
}

const createTransfers = async (sellerTotals: { seller_id: string; total_amount: number }[], uniqueTransferGroupIdentifier: string) => {
  sellerTotals.forEach(async (sellerData) => {
    try {
      const transfer = await stripe.transfers.create({
        amount: Math.round(sellerData.total_amount * 100 * 0.8),
        currency: 'eur',
        destination: sellerData.seller_id,
        transfer_group: uniqueTransferGroupIdentifier,
      });

      // Gestione della risposta del trasferimento creato
      console.log('Transfer created:', transfer);
    } catch (error) {
      // Gestione degli errori durante la creazione del trasferimento
      console.error('Error creating transfer:', error);
    }
  });
};

app.post(route + '/stripe-session-id', async (req: Request, res: Response) => {
  const uniqueTransferIdentifier = generateUniqueString();
  const { user } = req.body;
  const { orderDetailsId } = req.body as { orderDetailsId: string };

  const { data, error } = await supabase.from('order_details').select('*').eq('order_id', orderDetailsId);
  if (error) {
    console.error(error);
  }

  const session = await stripe.checkout.sessions.create({
    line_items: data?.map((item) => {
      return {
        price_data: {
          currency: 'eur',
          unit_amount: item.price * 100,
          product_data: {
            name: item.product_name,
            images: [item.url],
          },
        },
        quantity: item.quantity,
      };
    }),
    payment_intent_data: {
      transfer_group: uniqueTransferIdentifier,
    },
    mode: 'payment',
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['IT'],
    },
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${orderDetailsId}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });
  console.log('SESSION ', session.payment_status);
  const { error: stripeSessionError } = await supabase
    .from('profiles')
    .update({ stripeSession: session, transfer_group: uniqueTransferIdentifier })
    .eq('id', user);
  if (stripeSessionError) {
    console.error(stripeSessionError);
  }

  const session_url = session.url;
  const payment_status = session.payment_status;

  return res.status(200).json({
    sessionUrl: session_url,
    paymentStatus: payment_status,
  });
});

app.post(route + '/stripe-success', async (req: Request, res: Response) => {
  try {
    // 1 get orderId from req.body;
    const { orderId } = req.body;
    // 2 get currently logged in user from req.body;
    const user = req.body.user;
    //console.log('USER', user);
    const { uniqueIdentifier } = req.body as { uniqueIdentifier: string };
    // 3 retrieve stripe session, based on session id we previously save in profiles table in the db;
    const { data: stripe_session } = await supabase.from('profiles').select('stripeSession').eq('id', user);

    if (stripe_session?.[0].stripeSession.id) {
      const sessionId = stripe_session?.[0].stripeSession.id;
      const session = await stripe?.checkout?.sessions?.retrieve(sessionId);

      // 4 If session payment status is paid, transfer fund to the sellers and create order
      console.log(session);
      if (session.payment_status === 'paid') {
        // check if order with that session id already exist by query orders collections

        const { data: stripeSessionData, error } = await supabase.from('orders').select('stripeSession');
        if (error) console.error(error);

        const stripeSessionIdExist = stripeSessionData?.find((stripe) => stripe.stripeSession && stripe.stripeSession.id === session.id);

        const orderExist = !!stripeSessionIdExist;
        if (orderExist) {
          // 6 send success true
          res.json({ success: true });
        } else {
          // 7 else create new order and send success true

          const { data, error: orderDetailsError } = await supabase.from('order_details').select('*').eq('order_id', orderId);
          if (orderDetailsError) {
            console.error(orderDetailsError);
          }

          const seller_totals = calculateTotalAmountBySeller(data!);
          console.log(seller_totals);
          createTransfers(seller_totals, uniqueIdentifier);

          const customerAddress = {
            city: session.shipping_details.address.city,
            country: session.shipping_details.address.country,
            street: session.shipping_details.address.line1,
            postal_code: session.shipping_details.address.postal_code,
            state: session.shipping_details.address.state,
          };

          const order = {
            order_id: orderId,
            customer_id: user,
            customer_email: session.customer_details.email,
            order_details: data,
            amount: session.amount_total / 100,
            payment_status: session.payment_status,
            created_at: new Date(session.created * 1000),
            name: session.shipping_details.name,
            address: customerAddress,
            stripeSession: session,
          };

          console.log('ORDER', order);
          const { error } = await supabase.from('orders').insert(order);
          if (error) {
            console.log(error);
          }
          // 8 remove user' s  stripeSession
          const { error: profilesError } = await supabase
            .from('profiles')
            .update({ stripeSession: null, transfer_group: null })
            .eq('id', user);
          if (profilesError) {
            console.log(profilesError);
          }

          return res.status(200).json({ success: true });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

app.post(route + '/payout-setting', async (req: Request, res: Response) => {
  const userId = req.body.user;
  const { data: user, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return res.status(400).json({ error: error.message });
  const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id);
  // , {redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,}
  return res.status(200).json(loginLink);
});

app.post(route + '/get-account-balance', async (req: Request, res: Response) => {
  const userId = req.body.user;
  const { data: user, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return res.status(400).json({ error: error.message });
  const balance = await stripe.balance.retrieve({ stripeAccount: user.stripe_account_id });
  return res.status(200).json(balance);
});

app.post(route + '/create-connect-account', async (req: Request, res: Response) => {
  const userId = req.body.user;

  const { data: user, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return res.status(400).json({ error: error.message });

  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: 'express',
    });

    user.stripe_account_id = account.id;

    const { error } = await supabase.from('profiles').update({ stripe_account_id: user.stripe_account_id }).eq('id', userId);

    if (error) console.error(error);

    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: 'account_onboarding',
    });
    accountLink = Object.assign(accountLink, { 'stripe_user[email]': user.email || undefined });

    const link = `${accountLink.url}?${querystring.stringify(accountLink)}`;

    return res.status(200).json(link);
  }
});

app.post(route + '/get-account-status', async (req: Request, res: Response) => {
  const userId = req.body.user;
  const { data: user, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return res.status(400).json({ error: error.message });

  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  const { error: updateError } = await supabase.from('profiles').update({ stripe_seller: account, new: true }).eq('id', userId);
  if (updateError) return res.status(400).json({ error: updateError.message });

  return res.status(200).json(user);
});

let cart: CartProps | undefined;

app.post(route + '/add-to-cart', async (req: Request, res: Response) => {
  const product: ProductDetailsProps = req.body.product;
  const cartCookie = req.cookies.cart;

  if (!cart || !cartCookie) {
    cart = { products: [], total: 0 };
  }

  const isProductInCart = cart.products.find((cartProduct) => cartProduct.product_id === product.product_id);
  const itemAlreadyExist = !!isProductInCart;

  if (itemAlreadyExist) {
    isProductInCart.quantity += product.quantity;
    isProductInCart.amount += product.amount;
  } else {
    cart.products = [...cart.products, product];
  }

  cart.total = cart.products.reduce((total, cartProduct) => total + cartProduct.amount, 0);
  res.cookie('cart', cart, {
    httpOnly: true,
    // expires: new Date(Date.now() + 8 * 3600000),
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  });
  return res.status(200).json({ message: 'Cookie stored', success: true, cart });
});

app.get(route + '/get-cookie', (req, res) => {
  const cookies = req.cookies;
  res.json({ cookies: cookies });
});

app.patch(route + '/delete-cookie/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const cartCookie = req.cookies.cart;

  if (!cart || !cartCookie) {
    cart = { products: [], total: 0 };
  }

  if (cart) {
    let indexElement = cart.products.findIndex((product: ProductDetailsProps) => product.product_id === productId);

    if (indexElement !== -1) {
      if (cart.products[indexElement].quantity > 1) {
        cart.products[indexElement].quantity = cart.products[indexElement].quantity - 1;
        cart.products[indexElement].amount = cart.products[indexElement].amount - cart.products[indexElement].price;
      } else {
        return;
      }
    } else {
      console.log(`Product ${productId} does not exist`);
    }
  }

  cart.total = cart.products.reduce((total, cartProduct) => total + cartProduct.amount, 0);
  res.cookie('cart', cart, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  });
  return res.status(200).json({ message: 'Cookie stored', success: true, cart });
});

app.get(route + '/shop/:category', async (req: Request, res: Response) => {
  let slug = req.params.category;
  const { data: shop, error } = await supabase.from('shop_categories').select('*').eq('slug', slug).limit(1);
  if (error) return res.status(400).json({ error: error.message });
  return res.json(shop);
});

app.get(route + '/shop/:category/:serviceId', async (req: Request, res: Response) => {
  const category = req.params.category;
  const serviceId = req.params.serviceId;
  const { data, error } = await supabase.from('shop_categories').select('products').eq('slug', category).limit(1);

  const filteredProduct = data?.[0].products.filter((product: Product) => product.slug === serviceId);

  if (error) return res.status(400).json({ error: error.message });
  return res.json(filteredProduct);
});

app.get(route + '/shop', async (req: Request, res: Response) => {
  const { data: shop, error } = await supabase.from('shop').select('*');
  if (error) return res.status(400).json({ error: error.message });
  return res.json(shop);
});

//Logout
app.get(route + '/logout', async (req: Request, res: Response) => {
  res.cookie('server-access-token', { expires: Date.now() });
  res.cookie('server-refresh-token', { expires: Date.now() });
  return res.status(200).json({ message: 'Cookies expired' });
});

// Store Auth Cookies
app.post(route + '/store-auth', async (req: Request, res: Response) => {
  // Guard: Ensure tokens
  if (!req?.body?.accessToken || !req?.body?.refreshToken) {
    return res.status(401).json({ message: 'healthMissing token(s)' });
  }

  // Get token
  const accessToken = req.body.accessToken;
  const refreshToken = req.body.refreshToken;

  // Determine expiration
  const dateAccess = new Date();
  const dateRefresh = new Date();

  dateAccess.setHours(dateAccess.getHours() + 1);
  dateRefresh.setDate(dateRefresh.getDate() + 1);

  // Set Cookies - access token
  res.cookie('server-access-token', accessToken, {
    secure: process.env.NODE_ENV != 'development',
    httpOnly: true,
    expires: dateAccess,
    sameSite: 'lax',
  });

  // Set Cookies - refresh token
  res.cookie('server-refresh-token', refreshToken, {
    secure: process.env.NODE_ENV != 'development',
    httpOnly: true,
    expires: dateRefresh,
    sameSite: 'lax',
  });

  // Return response
  return res.status(200).json({ message: 'Tokens stored' });
});

app.listen(port, () => {
  console.log('Backend server listening on port ' + port);
});
