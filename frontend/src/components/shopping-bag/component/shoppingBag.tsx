import { type QRL, component$, useContext, type Signal, useTask$ } from '@builder.io/qwik';
import { BodyContext, CartContext } from '~/root';
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
import { type ProductDetailsProps } from '~/routes/[...catchAll]/types';

export const ShoppingBag = component$(
  (props: {
    text: string;
    closed: QRL<() => void>;
    cookie?: Readonly<
      Signal<{
        [x: string]: any;
      }>
    >;
  }) => {
    const backgroundColor = useContext(BodyContext);
    const cart: any = useContext(CartContext);

    //console.log('VALOREEEEEE', props.cookie?.value);
    useTask$(() => {
      if (props.cookie?.value) {
        //console.log('props.cookie.value', props.cookie.value);
        cart.value = props.cookie.value;
      }
    });

    // console.log('DENTRO SHOPPING CARD', cart.value);
    return (
      <>
        {cart.value?.length > 0 ? (
          <div class={wrap}>
            <div class={wrapFirstChild}>
              <div class={productsContainer}>
                <div>
                  <div>
                    <div>
                      {cart.value.map((product: ProductDetailsProps) => {
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
                                      <button class={controlsStyle}>+</button>
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
                <div>EUR 0.00</div>
              </div>
              <div class={styles['shipping-container']}>
                <div style={{ flex: 1 }}>Shipping</div>
                <div>EUR 0.00</div>
              </div>
              <div class={styles['total-container']}>
                <div style={{ flex: 1 }}>Total</div>
                <div>EUR 0.00</div>
              </div>
              <div class={styles['custom-button-container']}>
                <CustomButton />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
