import { component$ } from '@builder.io/qwik';
import { routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';
import { formInstruction, formWrap, wrapperSeller } from '../styles.css';
import { supabase } from '~/utils/supabase';
import SellerForm from '~/components/seller-form/component/sellerForm';

export const useGeoCode = routeLoader$(async () => {
  const res = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
  const geoInfo = await res.json();
  return geoInfo as any;
});

export const useSellerEmail = routeLoader$(async (requestContext) => {
  const { data, error } = await supabase.from('profiles').select('email').eq('stripe_account_id', requestContext.params.sellerID);
  if (error) console.error(error);
  const sellerEmail = data?.[0]?.email as string;
  return sellerEmail;
});

export const useSellerInformation = routeAction$(
  async (sellerInfo, requestContext) => {
    const { error } = await supabase
      .from('profiles')
      .update({ seller_info: sellerInfo })
      .eq('stripe_account_id', requestContext.params.sellerID);
    if (error) {
      console.error(error);
    }

    return {
      sellerInfo,
    };
  },
  zod$({
    name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
    company: z.string(),
    street1: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.coerce.number().min(10000),
    country: z.string(),
    phone: z.string().regex(/^\d{10}$/),
    email: z.string().email().trim(),
  })
);

const SellerInfo = component$(() => {
  return (
    <div class={formWrap}>
      <h3 class={formInstruction}>
        * To ensure a seamless shipment to your customer, we kindly request you to fill out our form with your address details and other
        pertinent information. Thank you for your cooperation in helping us deliver top-notch service.
      </h3>
      <div class={wrapperSeller}>
        <SellerForm />
      </div>
    </div>
  );
});

export default SellerInfo;
