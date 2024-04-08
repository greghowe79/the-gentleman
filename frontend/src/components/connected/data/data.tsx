import FaProducts from '~/components/starter/icons/products';
import { $, type Signal } from '@builder.io/qwik';
import FaSettings from '~/components/starter/icons/settings';
import { type UserSess } from '~/root';
import { type RouteNavigate } from '@builder.io/qwik-city';
import FaUserO from '~/components/starter/icons/user';
import { handlePayoutSettings } from '../actions/actions';
import FaDashboard from '~/components/starter/icons/dashboard';
import FaOrders from '~/components/starter/icons/orders';
import FaBalance from '~/components/starter/icons/balance';
import StripeLoader from '~/components/stripe-loader/component/stripeLoader';
import Balance from '~/components/balance/component/balance';
import SellerProducts from '~/components/seller-products/component/sellerProducts';
import type { BalanceProps } from '../types/types';
import FaReports from '~/components/starter/icons/reports';

export const dashboardList = [
  { id: 0, label: 'Dashboard', type: <FaDashboard />, onClick: $(() => console.log('ciao')) },
  { id: 1, label: 'Products', type: <FaProducts />, onClick: $(() => console.log('ciao')) },
  { id: 2, label: 'Orders', type: <FaOrders />, onClick: $(() => console.log('ciao')) },
  { id: 3, label: 'Coupons', type: 'icon', onClick: $(() => console.log('ciao')) },
  { id: 4, label: 'Reports', type: <FaReports />, onClick: $(() => console.log('ciao')) },
  { id: 5, label: 'Reviews', type: 'icon', onClick: $(() => console.log('ciao')) },
  { id: 6, label: 'Balance', type: <FaBalance />, onClick: $(() => console.log('ciao')) },
  {
    id: 7,
    label: 'Payouts',
    type: <FaSettings />,
    onClick: $((loading: Signal<boolean>, userSession: UserSess, nav: RouteNavigate) => handlePayoutSettings(loading, userSession, nav)),
  },
  { id: 8, label: 'Profile', type: <FaUserO />, onClick: $(() => console.log('ciao')) },
];

export const getDashboardComponents = $((balance?: BalanceProps) => {
  return [
    {
      id: 0,
      child: <div>COMPONENTE 0</div>,
    },
    {
      id: 1,
      child: <SellerProducts />,
    },
    {
      id: 2,
      child: <div>COMPONENTE 2</div>,
    },
    {
      id: 3,
      child: <div>COMPONENTE 3</div>,
    },
    {
      id: 4,
      child: <div>COMPONENTE 4</div>,
    },
    {
      id: 5,
      child: <div>COMPONENTE 5</div>,
    },
    {
      id: 6,
      child: <Balance balance={balance} />,
    },
    {
      id: 7,
      child: <StripeLoader />,
    },
    {
      id: 8,
      child: <div>COMPONENTE 8</div>,
    },
  ];
});
