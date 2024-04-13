import { component$, useContext, useSignal, useTask$, $ } from '@builder.io/qwik';
import { columns, dashboardList } from '../data/data';
import { contentStyle, iconLabelWrap, labelStyle, liStyle, listWrap, ulStyle } from '../styles/style.css';
import type { ConnectedProps } from '../types/types';
import { useNavigate } from '@builder.io/qwik-city';
import { UserSessionContext, ProductsSellerContext } from '~/root';
//import type { SellerProduct } from '~/components/seller-products/types/types';

const Connected = component$<ConnectedProps>(({ balance }) => {
  const userSession = useContext(UserSessionContext);
  const loading = useSignal(false);
  const nav = useNavigate();
  // const products = useSignal<SellerProduct[]>([]);
  const products = useContext(ProductsSellerContext);
  const clickedIndex = useSignal(0);

  useTask$(() => {
    clickedIndex.value = 0;
  });

  const propsArray = [
    { customProp1: 'valore personalizzato 0' },
    { userSession: userSession, seller_products: products, columns: columns },
    { customProp2: 'valore personalizzato 2' },
    { customProp2: 'valore personalizzato 3' },
    { customProp2: 'valore personalizzato 4' },
    { customProp2: 'valore personalizzato 5' },
    { balance: balance },
    { loading: loading, userSession: userSession, nav: nav },
    { customProp2: 'valore personalizzato 8' },
  ];

  const handleActiveItem = $((itemID: number) => {
    clickedIndex.value = itemID;
  });
  return (
    <div class={listWrap}>
      <ul class={ulStyle}>
        {dashboardList(propsArray).map((item) => (
          <li key={item.id} class={liStyle} onClick$={() => [handleActiveItem(item.id), item.onClick()]}>
            <div class={iconLabelWrap}>
              {item.type}
              <div class={labelStyle}>{item.label}</div>
            </div>
          </li>
        ))}
      </ul>

      <div key={dashboardList(propsArray)[clickedIndex.value].id} class={contentStyle}>
        {dashboardList(propsArray)[clickedIndex.value].component}
      </div>
    </div>
  );
});

export default Connected;
