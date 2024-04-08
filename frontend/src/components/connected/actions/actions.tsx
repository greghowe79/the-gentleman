import { $, type Signal } from '@builder.io/qwik';
import type { RouteNavigate } from '@builder.io/qwik-city';
import type { UserSess } from '~/root';
import { payoutSetting } from '~/utils/stripe';
import type { ComponentProps } from '../types/types';

const handlePayoutSettings = $(async (loading: Signal<boolean>, userSession: UserSess, nav: RouteNavigate) => {
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

const handleActiveComponent = $((itemID: number, activeComponent: Signal<number>) => {
  if (activeComponent.value !== itemID) {
    activeComponent.value = itemID;
    return activeComponent.value;
  }
  return null;
});

const renderComponent = $((components: ComponentProps[], activeComponent: Signal<number>, contentStyle: string) => {
  return components[activeComponent.value] ? (
    <div key={activeComponent.value} class={contentStyle}>
      {components[activeComponent.value].child}
    </div>
  ) : null;
});

export { handleActiveComponent, handlePayoutSettings, renderComponent };
