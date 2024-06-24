import { type Signal, component$, createContextId, useContextProvider, useSignal, useVisibleTask$, useStore, $ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';
import { supabase } from './utils/supabase';
import axios from 'axios';
import type { ItemProps } from './routes/shop/types/types';
import type { SellerProduct } from './components/seller-products/types/types';
import type { CartProps } from './utils/product_detail_page_utils/types';

export type UserSess = {
  userId: string;
  isLoggedIn: boolean;
  stripe_seller: any;
  charges_enabled: boolean;
  seller_info: any;
};

export type OpenPanel = {
  isOpen: boolean;
};

export type IkonKey = {
  number: string;
};

export const BodyContext = createContextId<Signal<string>>('body-context');
export const UserSessionContext = createContextId<UserSess>('user-session');
export const CartContext = createContextId<Signal<CartProps>>('cart-context');
export const ModalContext = createContextId<Signal<boolean>>('modal-context');
export const ImagesContext = createContextId<Signal<any>>('images-context');
export const ImageIndexContext = createContextId<Signal<number>>('image-index-context');
export const ProductsTableContext = createContextId<Signal<ItemProps[]>>('product-table-context');
export const ProductsSellerContext = createContextId<Signal<SellerProduct[]>>('seller-products-context');
export const OpenPanelContext = createContextId<OpenPanel>('panel-context');
export const IconKeyContext = createContextId<IkonKey>('iconKey-context');
export const ImageNameContext = createContextId<Signal<string>>('image-name-context');
export const sellerFormContext = createContextId<Signal<boolean>>('seller-form-context');
export const HasErrorContext = createContextId<Signal<boolean>>('has-error-context');
export const HasPhoneErrorContext = createContextId<Signal<boolean>>('has-phone-error-context');

export default component$(() => {
  const currentIndex = useSignal(0);
  const isModalVisible = useSignal(false);
  const images: Signal<any> = useSignal([]);
  const imageIndex: Signal<number> = useSignal(0);
  const productsTable: Signal<ItemProps[]> = useSignal([]);
  const products = useSignal<SellerProduct[]>([]);
  const iconKey = useStore<IkonKey>({ number: '' });
  const imageName = useSignal('');
  const sellerFormIsCompleted = useSignal(false);
  const hasError = useSignal(false);
  const hasPhoneError = useSignal(false);

  const userSession = useStore<UserSess>({
    userId: '',
    isLoggedIn: false,
    stripe_seller: {},
    charges_enabled: false,
    seller_info: {},
  });

  const openPanel = useStore<OpenPanel>({
    isOpen: false,
  });

  const getUserProfile = $(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) return data;
    }
  });

  const backgroundColor = useSignal('rgb(0, 0, 0)');
  const cart: Signal<CartProps> = useSignal({ products: [], total: 0 });

  const colors = ['rgb(0, 0, 0)', 'rgb(139,43,39)'];

  const body = document.body;

  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser();

    const userProfile = await getUserProfile();
    if (data.user?.id) {
      userSession.userId = data.user.id;
      userSession.isLoggedIn = true;
    } else {
      userSession.userId = '';
      userSession.isLoggedIn = false;
    }
    if (userProfile && userProfile.stripe_seller) {
      userSession.stripe_seller = userProfile.stripe_seller;
      userSession.charges_enabled = userProfile.stripe_seller.charges_enabled;
      userSession.seller_info = userProfile.seller_info;
    } else {
      userSession.stripe_seller = {};
      userSession.charges_enabled = false;
      userSession.seller_info = {};
    }
  });

  useVisibleTask$((taskContext) => {
    const interval = setInterval(() => {
      body.style.background = colors[currentIndex.value];
      backgroundColor.value = colors[(currentIndex.value + 1) % colors.length];
      currentIndex.value = (currentIndex.value + 1) % colors.length;
    }, 6000);
    taskContext.cleanup(() => clearInterval(interval));
  });

  useVisibleTask$(async () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === 'SIGNED_IN' && session?.access_token && session?.refresh_token) {
        //SEND COOKIES TO SERVER
        const bodyContent = {
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
        };
        //send request to server
        await axios
          .post('/api_v1/store-auth', bodyContent, { withCredentials: true })
          .then((res) => {
            console.log(res.data);

            //Set Auth State Context
            userSession.userId = session?.user.id;
            userSession.isLoggedIn = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (event === 'SIGNED_OUT') {
        //SIGN OUT THE USER ON SERVER
        await axios
          .get('/api_v1/logout')
          .then((res) => {
            console.log(res.data);
            //Set Auth State Context
            userSession.userId = '';
            userSession.isLoggedIn = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  useContextProvider(BodyContext, backgroundColor);
  useContextProvider(UserSessionContext, userSession);
  useContextProvider(CartContext, cart);
  useContextProvider(ModalContext, isModalVisible);
  useContextProvider(ImagesContext, images);
  useContextProvider(ImageIndexContext, imageIndex);
  useContextProvider(ProductsTableContext, productsTable);
  useContextProvider(ProductsSellerContext, products);
  useContextProvider(OpenPanelContext, openPanel);
  useContextProvider(IconKeyContext, iconKey);
  useContextProvider(ImageNameContext, imageName);
  useContextProvider(sellerFormContext, sellerFormIsCompleted);
  useContextProvider(HasErrorContext, hasError);
  useContextProvider(HasPhoneErrorContext, hasPhoneError);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        {/*  <link rel="preload" href="/fonts/kronaone-regular-webfont.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
        {/* <link rel="preload" href="/fonts/montserrat-v26-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}

        <link rel="preload" href="/fonts/Cabin-Regular-webfont.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/FjallaOne-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* <link rel="preload" href="/fonts/FjallaOne-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /> */}
        <RouterHead />
        {/* <link rel="preload" href="/fonts/montserrat-v26-latin-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body
        lang="en"
        style={{
          background: `${colors[currentIndex.value]}`,
        }}
      >
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
