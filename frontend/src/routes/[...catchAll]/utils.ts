import { $, type Signal } from '@builder.io/qwik';
import { v4 as uuidv4 } from 'uuid';
import type { AddToCartParams, CartProps, ProductDetailsProps } from './types';
import axios, { type AxiosResponse } from 'axios';
import { type UserSess } from '~/root';
import { checkProductAlreadyExist, deleteOrderDetailsTable, insertProduct, updateOrderDetailsTable } from './actions';

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
