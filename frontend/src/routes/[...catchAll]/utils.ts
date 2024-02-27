import { $, type Signal } from '@builder.io/qwik';
import { v4 as uuidv4 } from 'uuid';
import type { AddToCartParams, CartProps, ProductDetailsProps } from './types';
import axios, { type AxiosResponse } from 'axios';
import { type UserSess } from '~/root';
import { checkProductAlreadyExist, insertProduct, updateOrderDetailsTable } from './actions';

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

export const handleDeleteProductFromCookie = $(async (cart: Signal<CartProps>, productID?: string) => {
  await axios
    .patch(`/api_v1/delete-cookie/${productID}`, { withCredentials: true })
    .then((response: AxiosResponse<any, any>) => {
      console.log('DATA', response.data.cart);

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
        const order = await checkProductAlreadyExist(orderDetails);

        if (order && order.length > 0) {
          await updateOrderDetailsTable(order, orderDetails);
        } else {
          await insertProduct(orderDetails);
        }
      }

      handleAddProductToCookie(orderDetails, cart);
    }
  }
  if (product !== null && product !== undefined) {
    if (userSession.isLoggedIn) {
      const order = await checkProductAlreadyExist(product);

      if (order && order.length > 0) {
        await updateOrderDetailsTable(order, product);
      } else {
        await insertProduct(product);
      }
    }
    handleAddProductToCookie(product, cart);
  }
});

export const deleteProduct = $((userSession: UserSess, product: ProductDetailsProps | null, cart: Signal<CartProps>) => {
  if (userSession.isLoggedIn) {
    console.log(`UTENTE LOGGATO`);
  }

  handleDeleteProductFromCookie(cart, product?.product_id);
});
