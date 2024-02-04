import { type QRL, component$, useContext, type Signal, useTask$ } from '@builder.io/qwik';
import { BodyContext, CartContext } from '~/root';
import { CustomButton } from '~/components/custom-button/component/customButton';
import styles from '../styles/shopping-bag.module.css';
import { Link } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';

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
        console.log('props.cookie.value', props.cookie.value);
        cart.value = props.cookie.value;
      }
    });

    console.log('DENTRO SHOPPING CARD', cart.value);
    return (
      <>
        {cart.value?.length > 0 ? (
          <div style={{ flex: '1', overflow: 'hidden' }}>
            <div style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
              <div style={{ padding: '30px 30px 60px 30px' }}>
                <div>
                  <div>
                    <div style={{ color: 'red' }}>
                      {cart.value.map((product: any) => {
                        return (
                          <div key={product.id}>
                            <Link href={'#'} style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ width: '60px', display: 'flex', alignItems: 'center' }}>
                                <Image
                                  src={product.url}
                                  layout="constrained"
                                  decoding="async"
                                  loading="lazy"
                                  alt="A lovely bath"
                                  // class={imageStyle}
                                />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>{product.product_name}</div>
                                <div></div>
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
                <div>CHF 0.00</div>
              </div>
              <div class={styles['shipping-container']}>
                <div style={{ flex: 1 }}>Shipping</div>
                <div>CHF 0.00</div>
              </div>
              <div class={styles['total-container']}>
                <div style={{ flex: 1 }}>Total</div>
                <div>CHF 0.00</div>
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
