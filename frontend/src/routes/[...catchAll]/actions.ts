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
    .update({ quantity: order[0]?.quantity + orderDetails.quantity, amount: order[0]?.amount + orderDetails.amount })
    .eq('product_id', orderDetails.product_id);

  if (error) {
    console.error(error);
  }
});

export const deleteOrderDetailsTable = $(async (order: ProductDetailsProps[], orderDetails: ProductDetailsProps) => {
  const { data: quantity } = await supabase.from('order_details').select('quantity').eq('product_id', orderDetails.product_id);
  if (quantity?.[0].quantity > 1) {
    const { error } = await supabase
      .from('order_details')
      .update({ quantity: order[0]?.quantity - 1, amount: order[0]?.amount - orderDetails.price })
      .eq('product_id', orderDetails.product_id);

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

export const deleteAllRows = $(async () => {
  const { data: order_details, error } = await supabase.from('order_details').select('id');

  if (error) {
    console.error(error);
  }

  if (order_details && order_details.length > 0) {
    for (const row of order_details) {
      const { error: deleteError } = await supabase.from('order_details').delete().eq('id', row.id);

      if (deleteError) {
        console.error(deleteError);
      }
    }
  }
});

export const updateTable = $(async (order: ProductDetailsProps[], product: ProductDetailsProps) => {
  order[0].quantity = product.quantity;
  order[0].amount = product.amount;

  const { error } = await supabase
    .from('order_details')
    .update({ quantity: order[0]?.quantity, amount: order[0]?.amount })
    .eq('product_id', product.product_id);

  if (error) {
    console.error(error);
  }
});
