import { component$, useContext, useSignal, $ } from '@builder.io/qwik';
import { BodyContext } from '~/root';
import styles from '../styles/custom-button.module.css';
import { Link } from '@builder.io/qwik-city';

export const CustomButton = component$(() => {
  const backgroundColor = useContext(BodyContext);
  const isActive = useSignal(false);
  const setIsActive = $(() => {
    isActive.value = !isActive.value;
  });

  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <div class={styles['custom-wrapper']}>
        <div
          class={styles['download-container']}
          style={{
            background: backgroundColor.value,
          }}
        >
          <Link class={styles['test']} href="/shop">
            <div
              class={styles['subContainer']}
              style={{
                boxShadow: isActive.value ? '0 1px 2px #333;' : '',
              }}
            >
              <div class={styles['button']} onClick$={() => setIsActive()}>
                <div
                  style={{
                    fontSize: '0.813rem',
                    color: `${
                      isActive.value ? backgroundColor.value : '#555'
                    } `,
                  }}
                >
                  Continue to shopping
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});
