import { $ } from '@builder.io/qwik';
import { supabase } from '~/utils/supabase';
import { type ProductDetailsProps } from './types';

export const checkProductAlreadyExist = $(async (orderDetails: ProductDetailsProps) => {
  const { data, error: productError } = await supabase.from('order_details').select('*').eq('product_id', orderDetails.product_id);

  if (productError) {
    console.error(productError);
    return;
  }
  return data as ProductDetailsProps[];
});

export const updateOrderDetailsTable = $(async (order: ProductDetailsProps[], orderDetails: ProductDetailsProps) => {
  const { error } = await supabase
    .from('order_details')
    .update({ quantity: order[0]?.quantity + orderDetails.quantity })
    .eq('product_id', orderDetails.product_id);

  if (error) {
    console.error(error);
    return;
  }
});

export const insertProduct = $(async (orderDetails: ProductDetailsProps) => {
  const { error } = await supabase.from('order_details').insert(orderDetails);
  if (error) {
    console.log(error);
  }
});
