import { $, type Signal } from '@builder.io/qwik';
import { v4 as uuidv4 } from 'uuid';

import axios, { type AxiosResponse } from 'axios';
import { type UserSess } from '~/root';
import { supabase } from '../supabase';
import type { AddToCartParams, CartProps, ProductDetailsProps } from './types';

export const checkProductAlreadyExist = $(async (orderDetails: ProductDetailsProps, user?: string) => {
  const { data, error: productError } = await supabase
    .from('order_details')
    .select('*')
    .eq('product_id', orderDetails.product_id)
    .filter('user_id', 'eq', user);

  if (productError) {
    console.error(productError);
    return;
  }

  return data as ProductDetailsProps[];
});

export const updateOrderDetailsTable = $(async (order: ProductDetailsProps[], orderDetails: ProductDetailsProps, user?: string) => {
  const { error } = await supabase
    .from('order_details')
    .update({ quantity: order[0]?.quantity + orderDetails.quantity, amount: order[0]?.amount + orderDetails.amount })
    .eq('product_id', orderDetails.product_id)
    .filter('user_id', 'eq', user);

  if (error) {
    console.error(error);
  }
});

export const deleteOrderDetailsTable = $(async (order: ProductDetailsProps[], orderDetails: ProductDetailsProps, user?: string) => {
  const { data: quantity } = await supabase
    .from('order_details')
    .select('quantity')
    .eq('product_id', orderDetails.product_id)
    .filter('user_id', 'eq', user);
  if (quantity?.[0].quantity > 1) {
    const { error } = await supabase
      .from('order_details')
      .update({ quantity: order[0]?.quantity - 1, amount: order[0]?.amount - orderDetails.price })
      .eq('product_id', orderDetails.product_id)
      .filter('user_id', 'eq', user);

    if (error) {
      console.error(error);
      return;
    }
  }
});

export const insertProduct = $(async (orderDetails: ProductDetailsProps, user?: string) => {
  orderDetails.user_id = user!;
  const { error } = await supabase.from('order_details').insert(orderDetails);
  if (error) {
    console.log(error);
  }
});

export const deleteAllRows = $(async (user?: string) => {
  const { data: order_details, error } = await supabase.from('order_details').select('user_id');

  if (error) {
    console.error(error);
  }

  if (order_details && order_details.length > 0) {
    for (const row of order_details) {
      if (row.user_id === user) {
        const { error: deleteError } = await supabase.from('order_details').delete().eq('user_id', row.user_id);
        if (deleteError) {
          console.error(deleteError);
        }
      }
    }
  }
});

export const updateTable = $(async (order: ProductDetailsProps[], product: ProductDetailsProps, user?: string) => {
  order[0].quantity = product.quantity;
  order[0].amount = product.amount;

  const { error } = await supabase
    .from('order_details')
    .update({ quantity: order[0]?.quantity, amount: order[0]?.amount })
    .eq('product_id', product.product_id)
    .filter('user_id', 'eq', user);

  if (error) {
    console.error(error);
  }
});

export const handleAddProductToCookie = $(async (product: ProductDetailsProps, cart: Signal<CartProps>) => {
  const bodyContent = {
    product: product,
  };
  await axios
    .post('/api_v1/add-to-cart', bodyContent, { withCredentials: true })
    .then((response: AxiosResponse<any, any>) => {
      cart.value = response.data.cart;

      return cart.value;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

export const handleDeleteProductFromCookie = $(async (cart: Signal<CartProps>, productID?: string) => {
  await axios
    .patch(`/api_v1/delete-cookie/${productID}`, { withCredentials: true })
    .then((response: AxiosResponse<any, any>) => {
      cart.value = response.data.cart;
      return cart.value;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

export const addToCart = $(async ({ isFromPdp, userSession, cart, product, selectedOption, service }: AddToCartParams) => {
  if (isFromPdp) {
    if (service && selectedOption) {
      const detailsId = uuidv4();

      const orderDetails = {
        id: detailsId,
        user_id: null,
        order_id: userSession.userId.split('').reverse().join(''),
        url: service.value[0]?.url,
        product_id: service.value[0]?.id,
        price: service.value[0]?.price,
        sku: service.value[0]?.sku,
        quantity: parseInt(selectedOption.value),
        product_name: service.value[0]?.name,
        amount: service.value[0]?.price * parseInt(selectedOption.value),
        slug: service.value[0]?.slug,
        category_slug: service.value[0]?.categorySlug,
        seller_id: service.value[0]?.seller,
      };

      if (userSession.isLoggedIn) {
        const order = await checkProductAlreadyExist(orderDetails, userSession.userId);

        if (order && order.length > 0) {
          await updateOrderDetailsTable(order, orderDetails, userSession.userId);
        } else {
          await insertProduct(orderDetails, userSession.userId);
        }
      }

      handleAddProductToCookie(orderDetails, cart);
    }
  }
  if (product !== null && product !== undefined) {
    if (userSession.isLoggedIn) {
      const order = await checkProductAlreadyExist(product, userSession.userId);

      if (order && order.length > 0) {
        await updateOrderDetailsTable(order, product, userSession.userId);
      }
      // else {
      //   await insertProduct(product);
      // }
    }
    handleAddProductToCookie(product, cart);
  }
});

export const deleteProduct = $(
  async (userSession: UserSess, product: ProductDetailsProps, cart: Signal<CartProps>, isLoading: Signal<boolean>) => {
    if (userSession.isLoggedIn) {
      isLoading.value = true;

      const order = await checkProductAlreadyExist(product, userSession.userId);

      if (order && order.length > 0) {
        await deleteOrderDetailsTable(order, product, userSession.userId);
      } else {
        console.log(`NON C'E' NESSUN ORDINE DA ELIMINARE`);
      }
    }

    handleDeleteProductFromCookie(cart, product.product_id);
  }
);
