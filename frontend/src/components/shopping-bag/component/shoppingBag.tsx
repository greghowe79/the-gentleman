import { type QRL, component$, useContext, type Signal, $, useResource$, useSignal } from '@builder.io/qwik';
import { BodyContext, type UserSess, UserSessionContext } from '~/root';
//import { CustomButton } from '~/components/custom-button/component/customButton';
import styles from '../styles/shopping-bag.module.css';
import { Link } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
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
  linkBtn,
  topBag,
  topBagTitle,
} from '../styles/style.css';
import { type CartProps, type ProductDetailsProps } from '~/routes/[...catchAll]/types';
import { addToCart, deleteProduct } from '~/routes/[...catchAll]/utils';

export const ShoppingBag = component$((props: { text: string; closed: QRL<() => void>; cart?: Signal<CartProps>; openPanel?: any }) => {
  const backgroundColor = useContext(BodyContext);
  const userSession = useContext(UserSessionContext);
  const isLoading = useSignal(false);

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

  return (
    <>
      {props.cart?.value && props.cart.value.products.length > 0 ? (
        <>
          <div class={topBag}>
            <div>
              <h2 class={topBagTitle}>Your cart</h2>
            </div>
            <button
              onClick$={() => (props.openPanel.isOpen = false)}
              style={{
                height: '28px',
                width: '28px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                background: 'transparent',
                color: 'var(--default-text-color)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                class="icon icon-close"
                fill="none"
                viewBox="0 0 18 17"
              >
                <path
                  d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                  fill="currentColor"
                ></path>
              </svg>
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
                            <Link class={linkStyle} href={'#'}>
                              <div class={imgWrap}>
                                <Image src={product.url} layout="constrained" decoding="async" loading="lazy" alt="A lovely bath" />
                              </div>
                              <div class={flexWrap}>
                                <div class={innerDiv}>
                                  <div class={line}>
                                    <Link class={nameStyle} href={'#'}>
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
                            </Link>
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
              <h2 style={{ flex: 1, fontSize: 'var(--font-size-lg)', color: 'var(--title-color)' }}>Estimated total</h2>
              <div>EUR {props.cart?.value ? props.cart.value.total : 0}</div>
            </div>
            <div class={styles['custom-button-container']}>
              {/*  <CustomButton /> */}
              <Link class={linkBtn} href="/checkout" onClick$={() => (props.openPanel.isOpen = false)}>
                <button class={customBtn}>Check out</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
