import { component$, useVisibleTask$, useSignal, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { supabase } from '~/utils/supabase';
import { UserSessionContext } from '~/root';

//import { LoaderContext } from '~/routes/layout';
import Loader from '~/components/loader/component/Loader';

const Staging = component$(() => {
  const userSession = useContext(UserSessionContext);
  //const isLoading = useContext(LoaderContext);
  const isProtected = useSignal(false);
  const isLoading = useSignal(true);
  const nav = useNavigate();

  useVisibleTask$(() => {
    const timeout = setTimeout(async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data.user?.id && !error) {
        isProtected.value = true;
        userSession.userId = data.user.id;
        userSession.isLoggedIn = true;

        await nav('/');
      } else {
        console.error(error);
        userSession.userId = '';
        userSession.isLoggedIn = false;
        await nav('/login/staging');
      }
      isLoading.value = false;
    }, 1000);
    return () => clearTimeout(timeout);
  });
  return (
    <div>
      {isLoading.value && <Loader />}

      {/* {!isLoading.value && isProtected.value && (
        <span>
          Redirect to{' '}
          <Link href="/">
            <button>Home Page</button>
          </Link>
        </span>
      )} */}

      {!isLoading.value && !isProtected.value && <>Please log in</>}
    </div>
  );
});
export default Staging;

export const head: DocumentHead = {
  title: 'Staging',
  meta: [
    {
      name: 'description',
      content: 'Authorization check for Code Raiders',
    },
  ],
};
