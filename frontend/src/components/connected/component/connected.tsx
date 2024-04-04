// import { component$, $, useContext, useSignal } from '@builder.io/qwik';
// import { Link, useNavigate } from '@builder.io/qwik-city';
// import { parent, div1, div2, div3, div4, div5, settingStyle, balanceStyle, uploadButton, productsLabel } from '../styles/style.css';
// import { currencyFormatter, payoutSetting } from '~/utils/stripe';
// import type { BalanceItem, ConnectedProps } from './types/types';
// import { UserSessionContext } from '~/root';
// // import FaSettings from '~/components/starter/icons/settings';
// // import FaProducts from '~/components/starter/icons/products';
import { component$, useSignal, $, useContext } from '@builder.io/qwik';
import { dashboardList } from '../data/data';
import { contentStyle, iconLabelWrap, labelStyle, liStyle, listWrap, ulStyle } from '../styles/style.css';
import { UserSessionContext } from '~/root';
import { useNavigate } from '@builder.io/qwik-city';
import type { ConnectedProps } from '../types/types';
import StripeLoader from '~/components/stripe-loader/component/stripeLoader';
import Balance from '~/components/balance/component/balance';

const Connected = component$<ConnectedProps>(({ balance }) => {
  const userSession = useContext(UserSessionContext);
  const loading = useSignal(false);
  const nav = useNavigate();
  const activeComponent = useSignal(0);
  const handleActiveComponent = $((itemID: number) => {
    activeComponent.value = itemID;
  });

  return (
    // <div class={parent}>
    //   <div class={div1}>div1</div>
    //   <div class={div2}>div2</div>
    //   <div class={div3}>div3</div>
    //   <div class={div4}>div4</div>
    //   <div class={div5}>
    //     <Link href="/upload-products" class={productsLabel}>
    //       <FaProducts />
    //       <button class={uploadButton}>Products</button>
    //     </Link>
    //   </div>
    //   <div class={settingStyle} onClick$={() => handlePayoutSettings()}>
    //     <FaSettings />
    //   </div>
    //   <div class={balanceStyle}>
    //     {balance?.pending.map((ba: BalanceItem, index: number) => {
    //       return <span key={index}>{currencyFormatter(ba)}</span>;
    //     })}
    //   </div>
    // </div>

    <div class={listWrap}>
      <ul class={ulStyle}>
        {dashboardList.map((item) => (
          <li key={item.id} class={liStyle} onClick$={() => [handleActiveComponent(item.id), item.onClick(loading, userSession, nav)]}>
            <div class={iconLabelWrap}>
              {item.type}
              <div class={labelStyle}>{item.label}</div>
            </div>
          </li>
        ))}
      </ul>

      {activeComponent.value === 0 && <div class={contentStyle}>COMPONENTE 0</div>}
      {activeComponent.value === 1 && <div class={contentStyle}>COMPONENTE 1</div>}
      {activeComponent.value === 2 && <div class={contentStyle}>COMPONENTE 2</div>}
      {activeComponent.value === 3 && <div class={contentStyle}>COMPONENTE 3</div>}
      {activeComponent.value === 4 && <div class={contentStyle}>COMPONENTE 4</div>}
      {activeComponent.value === 5 && <div class={contentStyle}>COMPONENTE 5</div>}
      {activeComponent.value === 6 && (
        <div class={contentStyle}>
          <Balance balance={balance} />
        </div>
      )}
      {activeComponent.value === 7 && (
        <div class={contentStyle}>
          <StripeLoader />
        </div>
      )}
      {activeComponent.value === 8 && <div class={contentStyle}>COMPONENTE 8</div>}
    </div>
  );
});

export default Connected;
