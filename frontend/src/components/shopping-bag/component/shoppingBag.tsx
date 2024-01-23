import { type QRL, component$, useContext } from '@builder.io/qwik';
import { BodyContext } from '~/root';
import { CustomButton } from '~/components/custom-button/component/customButton';
import styles from '../styles/shopping-bag.module.css';

export const ShoppingBag = component$(
  (props: { text: string; closed: QRL<() => void> }) => {
    const backgroundColor = useContext(BodyContext);

    return (
      <>
        <div class={styles['image-container']}>
          <div class={styles['image-container-firstChild']}>
            <div class={styles['image-container-secondChild']}>
              <img
                src="https://matruecannabis.com/front/assets/empty.67d2d.webp"
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
