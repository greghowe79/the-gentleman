import { type QRL, component$, useContext, type Signal, $, useTask$ } from '@builder.io/qwik';
import { BodyContext, type UserSess, UserSessionContext } from '~/root';
import { CustomButton } from '~/components/custom-button/component/customButton';
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
} from '../styles/style.css';
import { type CartProps, type ProductDetailsProps } from '~/routes/[...catchAll]/types';
import { addToCart, getCookie } from '~/routes/[...catchAll]/utils';

export const ShoppingBag = component$((props: { text: string; closed: QRL<() => void>; cart?: Signal<CartProps> }) => {
  const backgroundColor = useContext(BodyContext);
  const userSession = useContext(UserSessionContext);

  useTask$(() => {
    getCookie(props.cart);
  });

  const addProduct = $((isFromPdp: boolean, userSession: UserSess, cart: Signal<CartProps>, product: ProductDetailsProps) => {
    const newProduct = { ...product, quantity: 1, amount: product.price };
    addToCart({ isFromPdp, userSession, cart, product: newProduct });
  });

  return (
    <>
      {props.cart?.value && props.cart.value.products.length > 0 ? (
        <div class={[wrap, 'wrap']}>
          <div class={wrapFirstChild}>
            <div class={productsContainer}>
              <div>
                <div>
                  <div>
                    {props.cart.value.products.map((product: ProductDetailsProps) => {
                      return (
                        <div key={product.id}>
                          <Link class={linkStyle} href={'#'}>
                            <div class={imgWrap}>
                              <Image src={product.url} layout="constrained" decoding="async" loading="lazy" alt="A lovely bath" />
                            </div>
                            <div class={flexWrap}>
                              <div class={nameStyle}>{product.product_name}</div>
                              <div class={spacer}>
                                <div class={spacerFirstChild}>
                                  <div>
                                    <strong class={price}>EUR {product.amount}</strong>
                                  </div>
                                  <div class={controlsContainer}>
                                    <button class={controlsStyle}>-</button>
                                    <div class={itemsNumber}>{product.quantity}</div>
                                    <button onClick$={() => addProduct(false, userSession, props.cart!, product)} class={controlsStyle}>
                                      +
                                    </button>
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
      ) : (
        <div class={styles['image-container']}>
          <div class={styles['image-container-firstChild']}>
            <div class={styles['image-container-secondChild']}>
              <img src="https://matruecannabis.com/front/assets/empty.67d2d.webp" alt="" width={280} height={148} />
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
            <div class={styles['subtotal-container']}>
              <div style={{ flex: 1 }}>Subtotal</div>
              <div>EUR {props.cart?.value.total}</div>
            </div>
            <div class={styles['shipping-container']}>
              <div style={{ flex: 1 }}>Shipping</div>
              <div>EUR 0.00</div>
            </div>
            <div class={styles['total-container']}>
              <div style={{ flex: 1 }}>Total</div>
              <div>EUR {props.cart?.value.total}</div>
            </div>
            <div class={styles['custom-button-container']}>
              <CustomButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
