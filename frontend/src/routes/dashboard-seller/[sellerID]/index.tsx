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

    const { data: sellerInformation, error: sellerInformationError } = await supabase
      .from('profiles')
      .select('seller_info')
      .eq('stripe_account_id', requestContext.params.sellerID);

    if (sellerInformationError) {
      console.error(sellerInformationError);
    }
    return { success: true, sellerInformation };
  },
  zod$({
    name: z.string(),
    company: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.coerce.number().min(10000),
    country: z.string(),
    prefix: z.string(),
    phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/),
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
