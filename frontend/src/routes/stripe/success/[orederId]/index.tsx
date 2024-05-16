import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { UserSessionContext } from '~/root';
import { stripeSuccessRequest } from '~/utils/stripe';
import { supabase } from '~/utils/supabase';

const StripeSuccess = component$(() => {
  const location = useLocation();
  const userSession = useContext(UserSessionContext);
  const orderId = location.params.orederId;
  const nav = useNavigate();

  useVisibleTask$(async ({ track }) => {
    track(() => userSession.userId);
    if (userSession.userId) {
      const { data } = await supabase.from('profiles').select('transfer_group').eq('id', userSession.userId);

      const uniqueIdentifier = data?.[0]?.transfer_group;
      const res = await stripeSuccessRequest(userSession, orderId, uniqueIdentifier);
      await nav(res.success ? '/' : '/stripe/cancel');
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Payment success. {location.params.orederId}</h2>
      </div>
    </div>
  );
});

export default StripeSuccess;
