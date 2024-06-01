import { component$, useContext, $, useSignal, useTask$ } from '@builder.io/qwik';
import { UserSessionContext } from '~/root';
import { createConnectAccount, getAccountBalance } from '~/utils/stripe';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import Loader from '~/components/loader/component/Loader';
import {
  wrap,
  imgAccessoriesWrap,
  notConnWrap,
  overlay,
  subtitle,
  title_h3,
  advantages_container,
  img_accessories,
  wrapper,
  title,
  unorderList,
} from './styles.css';
import Connected from '~/components/connected/component/connected';
import type { BalanceProps } from '~/components/connected/types/types';
import { Image } from '@unpic/qwik';
import imageUrl from '~/media/accessories.jpg';

const SellerPage = component$(() => {
  const balance = useSignal<BalanceProps | undefined>();
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
      <>
        <div class={imgAccessoriesWrap}>
          <Image
            objectFit="cover"
            src={imageUrl}
            layout="constrained"
            decoding="async"
            loading="lazy"
            alt={`Men's Accessories`}
            class={img_accessories}
          />
          <div class={overlay}></div>
          <div class={wrapper}>
            <div class={wrap}>
              <h2 class={title}>Increase Your Revenue.</h2>
              <h3 class={subtitle}>Reach Thousands of Potential Customers for Men's Accessories Every Day</h3>
              <div class={advantages_container}>
                <ul class={unorderList}>
                  <li>Expand your business by reaching a network of continually growing buyers</li>
                  <li>Display your accessories in a marketplace dedicated to excellence and refinement</li>
                  <li>Receive personalized assistance to optimize your sales and grow with us</li>
                  <li>Sell without long-term commitments, with the option to modify or cancel at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
      </>
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
