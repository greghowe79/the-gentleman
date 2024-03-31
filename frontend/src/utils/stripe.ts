import { $ } from '@builder.io/qwik';

import axios from 'axios';
import { type BalanceItem } from '~/components/connected/component/types/types';
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

export const getAccountBalance = $(async (userSession: UserSess) => {
  const bodyContent = {
    user: userSession.userId,
  };
  const res = await axios.post('/api_v1/get-account-balance', bodyContent);

  return res.data;
});

export const currencyFormatter = $((data: BalanceItem) => {
  return (data.amount / 100).toLocaleString(data.currency, { style: 'currency', currency: data.currency });
});
