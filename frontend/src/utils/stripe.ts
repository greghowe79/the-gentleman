import { $ } from '@builder.io/qwik';

//import { server$ } from '@builder.io/qwik-city';

import axios from 'axios';
import { type UserSess } from '~/root';

export const createConnectAccount = $(async (user: string) => {
  if (user) {
    const bodyContent = {
      user: user,
    };
    const res = await axios.post('/api_v1/create-connect-account', bodyContent);

    return res;
  }
});

export const getAccountStatus = $(async (userSession: UserSess) => {
  const bodyContent = {
    user: userSession.userId,
  };
  const res = await axios.post('/api_v1/get-account-status', bodyContent);

  return res.data;
});

// export const createConnectAccount = server$(function (user: any) {
//   // `this` is the `RequestEvent` object
//   if (user) {
//     console.log(this.env.get('STRIPE_PUBLIC_KEY'));
//   }
// });
