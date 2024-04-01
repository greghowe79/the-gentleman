import { component$, $, useContext, useSignal } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { parent, div1, div2, div3, div4, div5, settingStyle, balanceStyle, uploadButton } from '../styles/style.css';
import { currencyFormatter, payoutSetting } from '~/utils/stripe';
import type { BalanceItem, ConnectedProps } from './types/types';
import { UserSessionContext } from '~/root';
import FaSettings from '~/components/starter/icons/settings';

const Connected = component$<ConnectedProps>(({ balance }) => {
  const userSession = useContext(UserSessionContext);
  const loading = useSignal(false);
  const nav = useNavigate();

  const handlePayoutSettings = $(async () => {
    loading.value = true;

    try {
      const res = await payoutSetting(userSession);
      await nav(res?.url);
      loading.value = false;
    } catch (error) {
      console.error(error);
      loading.value = false;
      alert('Unable to access to settings. Try again');
    }
  });
  return (
    <div class={parent}>
      <div class={div1}>div1</div>
      <div class={div2}>div2</div>
      <div class={div3}>div3</div>
      <div class={div4}>div4</div>
      <div class={div5}>
        <Link href="/upload-products">
          <button class={uploadButton}>Upload products</button>
        </Link>
      </div>
      <div class={settingStyle} onClick$={() => handlePayoutSettings()}>
        <FaSettings />
      </div>
      <div class={balanceStyle}>
        {balance?.pending.map((ba: BalanceItem, index: number) => {
          return <span key={index}>{currencyFormatter(ba)}</span>;
        })}
      </div>
    </div>
  );
});

export default Connected;
