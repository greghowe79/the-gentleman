import { type Signal, component$, createContextId, useContextProvider, useSignal, useVisibleTask$, useStore } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';
import { supabase } from './utils/supabase';
import axios from 'axios';
import { type ProductDetailsProps } from './routes/[...catchAll]/types';

export type UserSess = {
  userId: string;
  isLoggedIn: boolean;
};

export const BodyContext = createContextId<Signal<string>>('body-context');
export const UserSessionContext = createContextId<UserSess>('user-session');
export const CartContext = createContextId<Signal<ProductDetailsProps[]>>('cart-context');

export default component$(() => {
  const currentIndex = useSignal(0);

  const userSession = useStore<UserSess>({
    userId: '',
    isLoggedIn: false,
  });

  const backgroundColor = useSignal('rgb(0, 0, 0)');
  const cart: Signal<ProductDetailsProps[]> = useSignal([]);

  const colors = ['rgb(0, 0, 0)', 'rgb(47, 72, 88)', 'rgb(58, 0, 30)', 'rgb(131, 118, 85)'];

  const body = document.body;

  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user?.id) {
      //console.log(data);
      // Set Auth State Context
      userSession.userId = data.user.id;
      userSession.isLoggedIn = true;
    } else {
      // Set Auth State Context
      userSession.userId = '';
      userSession.isLoggedIn = false;
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

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        {/* <link rel="preload" href="/fonts/KronaOne-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /> */}
        <link rel="preload" href="/fonts/kronaone-regular-webfont.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* <link rel="preload" href="/fonts/Montserrat-VariableFont_wght.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /> */}

        <link rel="preload" href="/fonts/montserrat-v26-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <RouterHead />

        <link rel="preload" href="/fonts/montserrat-v26-latin-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
