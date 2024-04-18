import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { supabase } from '~/utils/supabase';

export const useProductDetails = routeLoader$(async (requestEvent) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', requestEvent.params.id);
  console.log('REQUEST PARAMS', requestEvent.params.id);
  if (error) {
    console.error(error);
  }
  console.log('ROUTELOADER', data);
  return {
    productDetail: data,
  };
});

const EditPage = component$(() => {
  const product = useProductDetails();
  console.log('PRODUCT', product.value.productDetail);
  return (
    <div>
      <h1>EDIT PAGE</h1>
    </div>
  );
});

export default EditPage;
