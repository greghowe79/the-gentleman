import { component$, useContext } from '@builder.io/qwik';
import { BodyContext } from '~/root';
import {
  pointStyle,
  spanStyle,
  linkStyle,
  shopTitleStyle,
  shopWrapperContent,
  categoryMenuContainer,
  leftWrapper,
  shopArea,
  shopContainer,
  shopHeaderArea,
  shopHeaderContainer,
  shopBreadcrumb,
} from './styles.css';
import { Arrow } from '~/components/starter/icons/arrow';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { ListShopCategories } from '~/components/list-shop-categories/component/listShopCategories';
import ShopProducts from '.';
import ProductListPage from './[category]';
//import { type JSX } from '@builder.io/qwik/jsx-runtime';
//import ProductListPage from './[category]';
//import ProductListPage from './[category]';

// import { ListShopCategories } from '~/components/list-shop-categories/component/listShopCategories';
// import ProductListPage from './[category]';

//import { routeLoader$, Form, routeAction$ } from '@builder.io/qwik-city';
//import styles from './button.module.css';

// export const useJokeVoteAction = routeAction$((props: any) => {
//   console.log('VOTE', props);
// });

// export default component$(() => {
//   const dadJokeSignal = useDadJoke();

//   const favoriteJokeAction = useJokeVoteAction();
//   return (
//     <section class="section bright">
//       <p>{dadJokeSignal.value.joke}</p>
//       <Form action={favoriteJokeAction}>
//         <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
//         <button name="vote" value="up" class={styles['custom-button']}>
//           👍
//         </button>
//         <button name="vote" value="down">
//           👎
//         </button>
//       </Form>
//     </section>
//   );
// });

export interface Product {
  id: number;
  created_at: Date;
  name: string;
  description: string;
  price: number;
}

interface Products {
  products: Product[];
}

export const useProducts = routeLoader$(async () => {
  const response = await fetch('http://localhost:3005/api_v1/shop', {
    headers: { Accept: 'application/json' },
  });
  const shop: Products = await response.json();
  return shop;
});

const Shop = component$(() => {
  const loc = useLocation();

  const products = useProducts();

  const backgroundColor = useContext(BodyContext);

  return (
    <div class={shopArea}>
      <div class={shopContainer}>
        <div class={shopHeaderArea}>
          <div class={shopHeaderContainer}>
            <div class={shopBreadcrumb}>
              <span class={spanStyle} style={{ padding: '0 30px' }}>
                <Arrow fill={backgroundColor.value} />
              </span>
              <span class={spanStyle}>
                <Link class={linkStyle} href="/">
                  <span>home</span>
                </Link>
                <strong class={pointStyle}>&nbsp; . &nbsp;</strong>
              </span>
              <span class={spanStyle}>
                {/*  */}
                {loc.params.category ? (
                  <Link class={linkStyle} href="/shop">
                    <span>shop</span>
                  </Link>
                ) : (
                  <span style={{ color: backgroundColor.value, cursor: 'default' }} class={linkStyle}>
                    shop
                  </span>
                )}

                {/*  */}
                {loc.params.category && <strong class={pointStyle}>&nbsp; . &nbsp;</strong>}
              </span>
              {loc.params.category && (
                <span class={spanStyle}>
                  <span style={{ color: backgroundColor.value, cursor: 'default' }} class={linkStyle}>
                    {loc.params.category.replace(/-/g, ' ')}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div class={shopWrapperContent}>
          <div class={categoryMenuContainer}>
            <div>
              <div class={shopTitleStyle} style={{ color: backgroundColor.value }}>
                Shop
              </div>
            </div>
            <ListShopCategories />
          </div>

          <div class={leftWrapper}>
            {loc.url.pathname === '/shop/' ? (
              <ShopProducts data={products.value} backgroundColor={backgroundColor.value} />
            ) : (
              <ProductListPage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Shop;
