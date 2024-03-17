import { $ } from '@builder.io/qwik';

//import { server$ } from '@builder.io/qwik-city';

import axios from 'axios';

export const createConnectAccount = $(async (user: any) => {
  if (user) {
    await axios.post('/api_v1/create-connect-account', {});
  }
});

// export const createConnectAccount = server$(function (user: any) {
//   // `this` is the `RequestEvent` object
//   if (user) {
//     console.log(this.env.get('STRIPE_PUBLIC_KEY'));
//   }
// });
