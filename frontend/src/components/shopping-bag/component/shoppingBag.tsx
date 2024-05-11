import { type QRL, component$, useContext, type Signal, $, useResource$, useSignal, type QwikMouseEvent } from '@builder.io/qwik';
import { BodyContext, type UserSess, UserSessionContext } from '~/root';

import styles from '../styles/shopping-bag.module.css';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import CloseIcon from '~/components/starter/icons/close';

import {
  controlsContainer,
  controlsStyle,
  flexWrap,
  imgWrap,
  itemsNumber,
  linkStyle,
  nameStyle,
  price,
  productsContainer,
  spacer,
  spacerFirstChild,
  wrap,
  wrapFirstChild,
  innerDiv,
  priceSmall,
  line,
  sbHeader,
  customBtn,
  // linkBtn,
  topBag,
  topBagTitle,
  total,
  closeButton,
  totalAmount,
  customBtnWrapper,
} from '../styles/style.css';
import { type CartProps, type ProductDetailsProps } from '~/routes/[...catchAll]/types';
import { addToCart, deleteProduct } from '~/routes/[...catchAll]/utils';
//import { createTransfers, getSessionId } from '~/utils/stripe';
import { getSessionId } from '~/utils/stripe';

export const ShoppingBag = component$((props: { text: string; closed: QRL<() => void>; cart?: Signal<CartProps>; openPanel?: any }) => {
  const backgroundColor = useContext(BodyContext);
  const userSession = useContext(UserSessionContext);
  const isLoading = useSignal(false);
  const nav = useNavigate();

  useResource$(async () => {
    const res = await fetch('/api_v1/get-cookie', { method: 'GET', credentials: 'include' });
    const data = await res.json();
    if (props.cart) {
      props.cart.value = data.cookies.cart;
      return props.cart.value;
    }
  });
  const addProduct = $(
    (isFromPdp: boolean, userSession: UserSess, cart: Signal<CartProps>, product: ProductDetailsProps, isLoading: Signal<boolean>) => {
      isLoading.value = true;
      const newProduct = { ...product, quantity: 1, amount: product.price };
      addToCart({ isFromPdp, userSession, cart, product: newProduct });
    }
  );

  const handleClick = $(async (e: QwikMouseEvent<HTMLButtonElement> & any) => {
    e.preventDefault();

    if (!userSession.isLoggedIn) {
      alert('PLEASE LOGIN');
      return;
    }
    isLoading.value = true;
    const orederId = userSession.userId.split('').reverse().join('');

    const res = await getSessionId(userSession, orederId);

    //4000000000000077
    await nav(res?.sessionUrl);
    isLoading.value = false;
  });

  return (
    <>
      {props.cart?.value && props.cart.value.products.length > 0 ? (
        <>
          <div class={topBag}>
            <div>
              <h2 class={topBagTitle}>Your cart</h2>
            </div>
            <button onClick$={() => (props.openPanel.isOpen = false)} class={closeButton}>
              <CloseIcon />
            </button>
          </div>
          <div class={sbHeader}>
            <div>PRODUCT</div>
            <div>TOTAL</div>
          </div>
          <div class={[wrap, 'wrap']}>
            <div class={wrapFirstChild}>
              <div class={productsContainer}>
                <div>
                  <div>
                    <div>
                      {props.cart.value.products.map((product: ProductDetailsProps) => {
                        isLoading.value = false;
                        return (
                          <div key={product.id}>
                            <div class={linkStyle}>
                              <div class={imgWrap}>
                                <Image src={product.url} layout="constrained" decoding="async" loading="lazy" alt="A lovely bath" />
                              </div>
                              <div class={flexWrap}>
                                <div class={innerDiv}>
                                  <div class={line}>
                                    <Link
                                      class={nameStyle}
                                      onClick$={() => (props.openPanel.isOpen = false)}
                                      href={'/shop/' + product.category_slug + '/' + product.slug}
                                    >
                                      {product.product_name}
                                    </Link>
                                    <div class={priceSmall}>EUR {product.price}</div>
                                  </div>
                                  <div class={controlsContainer}>
                                    <button
                                      onClick$={() => product.quantity > 1 && deleteProduct(userSession, product, props.cart!, isLoading)}
                                      class={controlsStyle}
                                      preventdefault:click
                                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                      style={{ zIndex: isLoading.value ? -1 : 0, opacity: isLoading.value ? 0.5 : 1 }}
                                    >
                                      -
                                    </button>

                                    <div
                                      class={itemsNumber}
                                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                      style={{ opacity: isLoading.value ? 0.5 : 1 }}
                                    >
                                      {product.quantity}
                                    </div>
                                    <button
                                      onClick$={() => addProduct(false, userSession, props.cart!, product, isLoading)}
                                      class={controlsStyle}
                                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                      style={{ zIndex: isLoading.value ? -1 : 0, opacity: isLoading.value ? 0.5 : 1 }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <div class={spacer}>
                                  <div class={spacerFirstChild}>
                                    <div>
                                      <span class={price}>EUR {product.amount}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class={styles['image-container']}>
          <div class={styles['image-container-firstChild']}>
            <div class={styles['image-container-secondChild']}>
              <img
                src="https://cdn.shopify.com/s/files/1/0798/7793/1357/files/empty_cart_nobg.webp?v=1708530970"
                alt=""
                width={280}
                height={148}
              />
              <div
                class={styles['text-container']}
                style={{
                  color: backgroundColor.value,
                }}
              >
                {props.text}
              </div>
            </div>
          </div>
        </div>
      )}

      <div class={styles['currency-container']}>
        <div class={styles['currency-container-firstChild']}>
          <div>
            <div class={styles['total-container']}>
              <h2 class={total}>Estimated total</h2>
              <div class={totalAmount}>EUR {props.cart?.value ? props.cart.value.total : 0}</div>
            </div>
            <div class={styles['custom-button-container']}>
              <div class={customBtnWrapper}>
                <button class={customBtn} onClick$={(e) => handleClick(e)} disabled={isLoading.value}>
                  {isLoading.value ? 'Loading...' : userSession.isLoggedIn ? 'Check out' : 'Login to checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
