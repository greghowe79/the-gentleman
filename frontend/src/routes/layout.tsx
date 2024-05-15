import { component$, createContextId, type Signal, Slot, useStore, useStyles$, useContext, useResource$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import { Header } from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer';
import styles from './styles.css?inline';
import IconsPanel from '~/components/starter/icons-panel/iconsPanel';
import { CartContext, ModalContext, UserSessionContext } from '~/root';
import Modal from '~/components/Modal/component/Modal';
import type { ProductDetailsProps } from '~/utils/product_detail_page_utils/types';
import {
  checkProductAlreadyExist,
  deleteAllRows,
  insertProduct,
  updateTable,
} from '~/utils/product_detail_page_utils/actions_product_detail_page';

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
  const cart = useContext(CartContext);
  const userSession = useContext(UserSessionContext);
  const isModalVisible = useContext(ModalContext);

  useStyles$(styles);

  useResource$(async ({ track }) => {
    track(() => userSession.isLoggedIn);

    if (!userSession.isLoggedIn) return;

    const res = await fetch('/api_v1/get-cookie', { method: 'GET', credentials: 'include' });
    const data = await res.json();

    if (!data.cookies.cart) {
      await deleteAllRows(userSession.userId);
      return;
    }

    const { products } = data.cookies.cart;

    await Promise.all(
      products.map(async (product: ProductDetailsProps) => {
        const order = await checkProductAlreadyExist(product, userSession.userId);

        order && order.length > 0
          ? await updateTable(order, product, userSession.userId)
          : await insertProduct(product, userSession.userId);
      })
    );
    cart.value = data.cookies.cart;
    return cart.value;
  });

  return (
    <>
      {isModalVisible.value && <Modal />}
      <IconsPanel openPanel={openPanel} iconKey={iconKey} cart={cart} />
      <Header openPanel={openPanel} iconKey={iconKey} location={loc.url.href} />

      <div class="scrollable-content">
        <main>
          <Slot />
        </main>
        {loc.url.href !== 'http://localhost/upload-products/' && loc.url.href !== 'http://localhost/dashboard-seller/' && <Footer />}
      </div>
    </>
  );
});
