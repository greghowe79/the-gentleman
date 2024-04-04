import { component$, useContext, $, useSignal, useTask$ } from '@builder.io/qwik';
import { UserSessionContext } from '~/root';
import { createConnectAccount, getAccountBalance } from '~/utils/stripe';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import Loader from '~/components/loader/component/Loader';
import { notConnWrap, title_h3 } from './styles.css';
import Connected from '~/components/connected/component/connected';
import type { Balance } from '~/components/connected/types/types';

const SellerPage = component$(() => {
  const balance = useSignal<Balance | undefined>();
  const loc = useLocation();
  const nav = useNavigate();
  const loading = useSignal(false);
  const userSession = useContext(UserSessionContext);

  useTask$(async ({ track }) => {
    const value = await track(() => userSession.userId && getAccountBalance(userSession));
    if (!value) return;
    balance.value = value;
  });

  const handleClick = $(async () => {
    loading.value = true;
    try {
      const res = await createConnectAccount(userSession.userId);
      await nav(res?.data);
    } catch (error) {
      console.error(error);
    }
  });

  const notConnected = $(() => {
    return (
      <div class={notConnWrap}>
        <h3 class={title_h3}>Setup payouts to post your products</h3>
        <div style={{ color: 'black' }}>THE GENTLEMAN partners with stripe to transfer earning to your bank account</div>

        <button
          disabled={loading.value}
          onClick$={() => (userSession.isLoggedIn ? handleClick() : alert('EFFETTUA IL LOGIN'))}
          style={{ display: loc.url.href !== 'http://localhost/dashboard-seller/' ? 'none' : 'block' }}
        >
          {loading.value ? 'Processing...' : 'Setup Payouts'}
        </button>

        <div style={{ color: 'black' }}>You'll be redirect to Stripe to complete the onboarding process</div>
      </div>
    );
  });

  return (
    <div>
      {loading.value ? (
        <Loader />
      ) : userSession.userId && userSession.isLoggedIn && userSession.stripe_seller && userSession.charges_enabled ? (
        <Connected balance={balance.value} />
      ) : (
        notConnected()
      )}
    </div>
  );
});

export default SellerPage;
