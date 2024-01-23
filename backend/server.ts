import express, { Express } from 'express';
import type { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import { Product } from './types/types';

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
