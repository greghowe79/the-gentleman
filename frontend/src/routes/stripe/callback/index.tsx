import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';

import { isBrowser } from '@builder.io/qwik/build';
import Loader from '~/components/loader/component/Loader';
import { UserSessionContext } from '~/root';
import { getAccountStatus } from '~/utils/stripe';

const StripeCallback = component$(() => {
  const userSession = useContext(UserSessionContext);
  const user = useSignal({});

  useTask$(async ({ track }) => {
    const value = await track(() => (userSession.userId ? getAccountStatus(userSession) : null));

    if (!value) return;
    user.value = value;

    if (isBrowser) {
      if (window.localStorage.getItem(localStorage.key(0)!)) {
        const auth = JSON.parse(localStorage.getItem(localStorage.key(0)!)!);
        auth.user = user.value;
        localStorage.setItem('authData', JSON.stringify(auth));
        window.location.href = '/become-a-seller/';
      }
    }
  });

  return (
    <div>
      <Loader />
    </div>
  );
});
export default StripeCallback;
