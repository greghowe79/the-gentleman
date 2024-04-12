import FaProducts from '~/components/starter/icons/products';
import { $, type Signal } from '@builder.io/qwik';
import FaSettings from '~/components/starter/icons/settings';
// import { type UserSess } from '~/root';
// import { type RouteNavigate } from '@builder.io/qwik-city';
import FaUserO from '~/components/starter/icons/user';
import { handlePayoutSettings } from '../actions/actions';
import FaDashboard from '~/components/starter/icons/dashboard';
import FaOrders from '~/components/starter/icons/orders';
import FaBalance from '~/components/starter/icons/balance';
import StripeLoader from '~/components/stripe-loader/component/stripeLoader';
import Balance from '~/components/balance/component/balance';
import SellerProducts from '~/components/seller-products/component/sellerProducts';
import FaReports from '~/components/starter/icons/reports';
import { supabase } from '~/utils/supabase';
import type { UserSess } from '~/root';

const handleClickDashboard = $((customProp: any) => {
  console.log('Dashboard clicked with customProp:', customProp);
});

const getSellerProducts = $(async (userSession: UserSess, sellerProducts: Signal<any>) => {
  console.log('sellerProducts', sellerProducts);
  const { data } = await supabase.from('products').select('*').eq('seller', userSession.stripe_seller.id);
  console.log('DATA', data);
  sellerProducts.value = data;
  return sellerProducts.value;
});

export const columns = [
  { id: 0, label: 'Image' },
  { id: 1, label: 'Name' },
  { id: 2, label: 'SKU' },
  { id: 3, label: 'Price' },
  { id: 4, label: 'Category' },
  { id: 5, label: 'Actions' },
];

export const dashboardList = (propsArray: any) => {
  console.log('SELLER PRODUCTS', propsArray[1].seller_products);
  return [
    {
      id: 0,
      label: 'Dashboard',
      type: <FaDashboard />,
      onClick: $(() => handleClickDashboard(propsArray[0].customProp1)),
      component: <div>COMPONENTE 0</div>,
    },
    {
      id: 1,
      label: 'Products',
      type: <FaProducts />,
      onClick: $(() => getSellerProducts(propsArray[1].userSession, propsArray[1].seller_products)),
      component: <SellerProducts products={propsArray[1]?.seller_products} columns={propsArray[1]?.columns} />,
    },
    {
      id: 2,
      label: 'Orders',
      type: <FaOrders />,
      onClick: $(() => console.log('ciao')),
      component: <div>COMPONENTE 2</div>,
    },
    {
      id: 3,
      label: 'Coupons',
      type: 'icon',
      onClick: $(() => console.log('ciao')),
      component: <div>COMPONENTE 3</div>,
    },
    {
      id: 4,
      label: 'Reports',
      type: <FaReports />,
      onClick: $(() => console.log('ciao')),
      component: <div>COMPONENTE 4</div>,
    },
    {
      id: 5,
      label: 'Reviews',
      type: 'icon',
      onClick: $(() => console.log('ciao')),
      component: <div>COMPONENTE 5</div>,
    },
    {
      id: 6,
      label: 'Balance',
      type: <FaBalance />,
      onClick: $(() => console.log('ciao')),
      component: <Balance {...propsArray[6]} />,
    },
    {
      id: 7,
      label: 'Payouts',
      type: <FaSettings />,
      onClick: $(() => handlePayoutSettings(propsArray[7].loading, propsArray[7].userSession, propsArray[7].nav)),
      component: <StripeLoader />,
    },
    {
      id: 8,
      label: 'Profile',
      type: <FaUserO />,
      onClick: $(() => console.log('ciao')),
      component: <div>COMPONENTE 8</div>,
    },
  ];
};
