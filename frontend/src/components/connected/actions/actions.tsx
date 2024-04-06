import { $, type Signal } from '@builder.io/qwik';
import type { RouteNavigate } from '@builder.io/qwik-city';
import type { UserSess } from '~/root';
import { payoutSetting } from '~/utils/stripe';

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

export { handleActiveComponent, handlePayoutSettings };
