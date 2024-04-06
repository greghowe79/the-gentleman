import { component$, useSignal, useContext, $ } from '@builder.io/qwik';
import { dashboardList } from '../data/data';
import { contentStyle, iconLabelWrap, labelStyle, liStyle, listWrap, ulStyle } from '../styles/style.css';
import { UserSessionContext } from '~/root';
import { useNavigate } from '@builder.io/qwik-city';
import type { ConnectedProps } from '../types/types';
import Balance from '~/components/balance/component/balance';
import { handleActiveComponent } from '../actions/actions';
import StripeLoader from '~/components/stripe-loader/component/stripeLoader';

const Connected = component$<ConnectedProps>(({ balance }) => {
  const userSession = useContext(UserSessionContext);
  const loading = useSignal(false);
  const nav = useNavigate();
  const activeComponent = useSignal(0);

  const components = [
    {
      id: 0,
      child: <div>COMPONENTE 0</div>,
    },
    {
      id: 1,
      child: <div>COMPONENTE 1</div>,
    },
    {
      id: 2,
      child: <div>COMPONENTE 2</div>,
    },
    {
      id: 3,
      child: <div>COMPONENTE 3</div>,
    },
    {
      id: 4,
      child: <div>COMPONENTE 4</div>,
    },
    {
      id: 5,
      child: <div>COMPONENTE 5</div>,
    },
    {
      id: 6,
      child: <Balance balance={balance} />,
    },
    {
      id: 7,
      child: <StripeLoader />,
    },
    {
      id: 8,
      child: <div>COMPONENTE 8</div>,
    },
  ];

  const renderComponent = $(() => {
    return components[activeComponent.value] ? (
      <div key={activeComponent.value} class={contentStyle}>
        {components[activeComponent.value].child}
      </div>
    ) : null;
  });

  return (
    <div class={listWrap}>
      <ul class={ulStyle}>
        {dashboardList.map((item) => (
          <li
            key={item.id}
            class={liStyle}
            onClick$={() => [handleActiveComponent(item.id, activeComponent), item.onClick(loading, userSession, nav)]}
          >
            <div class={iconLabelWrap}>
              {item.type}
              <div class={labelStyle}>{item.label}</div>
            </div>
          </li>
        ))}
      </ul>

      {renderComponent()}
    </div>
  );
});

export default Connected;
