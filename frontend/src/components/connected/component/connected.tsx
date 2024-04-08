import { component$, useSignal, useContext, useTask$ } from '@builder.io/qwik';
import { dashboardList, getDashboardComponents } from '../data/data';
import { contentStyle, iconLabelWrap, labelStyle, liStyle, listWrap, ulStyle } from '../styles/style.css';
import { UserSessionContext } from '~/root';
import { useNavigate } from '@builder.io/qwik-city';
import type { ComponentProps, ConnectedProps } from '../types/types';

import { handleActiveComponent, renderComponent } from '../actions/actions';

const Connected = component$<ConnectedProps>(({ balance }) => {
  const userSession = useContext(UserSessionContext);
  const loading = useSignal(false);
  const nav = useNavigate();
  const activeComponent = useSignal(0);
  const dashboardComponents = useSignal<ComponentProps[]>([]);

  useTask$(async () => {
    dashboardComponents.value = await getDashboardComponents(balance);
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

      {renderComponent(dashboardComponents.value, activeComponent, contentStyle)}
    </div>
  );
});

export default Connected;
