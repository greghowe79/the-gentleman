import { component$, createContextId, type Signal, Slot, useStore, useStyles$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { Cookie, RequestHandler } from '@builder.io/qwik-city';
import { Header } from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer';
import styles from './styles.css?inline';
import IconsPanel from '~/components/starter/icons-panel/iconsPanel';
import { type CartProps } from './[...catchAll]/types';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const LoaderContext = createContextId<Signal<boolean>>('loader-context');

export const onRequest: RequestHandler = async ({ cookie, sharedMap }) => {
  const cart = loadProductsFromCookie(cookie);

  if (cart) {
    sharedMap.set('cart', cart);
  } else {
    return;
  }
};

// function loadProductsFromCookie(cookie: Cookie): any {
//   if (cookie) {
//     let cart = cookie.get('cart')?.value;
//     if (cart) {
//       cart = cart.slice(2);
//       cart = JSON.parse(cart);
//       console.log('cart', cart);
//       console.log(typeof cart);
//       return cart;
//     }
//   } else {
//     return null;
//   }
// }

function loadProductsFromCookie(cookie: Cookie): CartProps | null {
  const cartValue = cookie.get('cart')?.value;

  if (cartValue) {
    try {
      const cart = JSON.parse(cartValue.slice(2)) as CartProps;
      console.log('cart', cart);

      return cart;
    } catch (error) {
      console.error('Error parsing cart JSON:', error);
      return null;
    }
  }

  return null;
}

export const useCookie = routeLoader$(({ sharedMap }) => {
  return sharedMap.get('cart') as CartProps;
});

export default component$(() => {
  const loc = useLocation();
  const openPanel = useStore({ isOpen: false });
  const iconKey = useStore({ number: '' });
  const cookie = useCookie();

  useStyles$(styles);

  return (
    <>
      <IconsPanel openPanel={openPanel} iconKey={iconKey} cookie={cookie} />
      <Header openPanel={openPanel} iconKey={iconKey} />
      <div class="scrollable-content">
        <main>
          <Slot />
        </main>
        {loc.url.href != 'http://localhost/upload-products/' && <Footer />}
      </div>
    </>
  );
});
