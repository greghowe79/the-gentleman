import { component$, createContextId, type Signal, Slot, useStore, useStyles$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import { Header } from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer';
import styles from './styles.css?inline';
import IconsPanel from '~/components/starter/icons-panel/iconsPanel';

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

export default component$(() => {
  const loc = useLocation();
  const openPanel = useStore({ isOpen: false });
  const iconKey = useStore({ number: '' });

  useStyles$(styles);

  return (
    <>
      <IconsPanel openPanel={openPanel} iconKey={iconKey} />
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
