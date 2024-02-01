import { $, type Signal } from '@builder.io/qwik';
import { supabase } from '~/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { type Service } from './types';

export const calculateCategoryPath = (pathname: string): string => {
  return pathname.replace(/\/[^/]+\/?$/, '');
};

export const addToCart = $(async (service: Readonly<Signal<Service[]>>, selectedOption: Signal<string>) => {
  const detailsId = uuidv4();

  const orderDetails = {
    id: detailsId,
    order_id: null,
    product_id: service.value[0]?.id,
    price: service.value[0]?.price,
    sku: service.value[0]?.sku,
    quantity: parseInt(selectedOption.value),
    product_name: service.value[0]?.name,
    amount: service.value[0]?.price * parseInt(selectedOption.value),
  };

  const { error } = await supabase.from('order_details').insert(orderDetails);
  if (error) {
    console.log(error);
  }
});
