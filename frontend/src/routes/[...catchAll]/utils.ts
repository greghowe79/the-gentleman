import { $, type Signal } from '@builder.io/qwik';
import { supabase } from '~/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import type { CartProps, ProductDetailsProps, Service } from './types';
import type { UserSess } from '~/root';
import axios, { type AxiosResponse } from 'axios';

export const calculateCategoryPath = (pathname: string): string => {
  return pathname.replace(/\/[^/]+\/?$/, '');
};

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

export const addToCart = $(
  async (
    isFromPdp: boolean,
    userSession: UserSess,
    cart: Signal<CartProps>,
    product?: ProductDetailsProps | null,
    selectedOption?: Signal<string>,
    service?: Readonly<Signal<Service[]>>
  ) => {
    if (isFromPdp) {
      if (service && selectedOption) {
        const detailsId = uuidv4();

        const orderDetails = {
          id: detailsId,
          order_id: null,
          url: service.value[0]?.url,
          product_id: service.value[0]?.id,
          price: service.value[0]?.price,
          sku: service.value[0]?.sku,
          quantity: parseInt(selectedOption.value),
          product_name: service.value[0]?.name,
          amount: service.value[0]?.price * parseInt(selectedOption.value),
        };

        if (userSession.isLoggedIn) {
          const { error } = await supabase.from('order_details').insert(orderDetails);
          if (error) {
            console.log(error);
          }
        }

        handleAddProductToCookie(orderDetails, cart);
      }
    }
    if (product !== null && product !== undefined) {
      handleAddProductToCookie(product, cart);
    }
  }
);
