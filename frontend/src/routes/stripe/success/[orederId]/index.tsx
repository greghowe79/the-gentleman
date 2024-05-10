import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { UserSessionContext } from '~/root';
import { stripeSuccessRequest } from '~/utils/stripe';

const StripeSuccess = component$(() => {
  const location = useLocation();
  const userSession = useContext(UserSessionContext);
  const orderId = location.params.orederId;
  const nav = useNavigate();

  useVisibleTask$(async ({ track }) => {
    track(() => userSession.userId);
    //location.params.orederId
    console.log('USER', userSession.userId);
    console.log('orderId', orderId);
    const res = await stripeSuccessRequest(userSession, orderId);
    // console.log('Stripe Success response ', res);

    await nav(res.success ? '/' : '/stripe/cancel');
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
