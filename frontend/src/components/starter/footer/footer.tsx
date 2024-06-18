import { component$ } from '@builder.io/qwik';
//import { useServerTimeLoader } from '~/routes/layout';
//import styles from './footer.module.css';
import { bgColor, link, flexContainer, flexParentWrap, paragraph, section } from './styles/styless.css';
//import { QwikLogo } from '../icons/qwik';

export default component$(() => {
  // const isDone = useSignal(true);

  /*  const setIsDone = $((newValue: boolean) => {
    isDone.value = newValue;
  }); */

  //const serverTime = useServerTimeLoader();

  return (
    <footer class={bgColor}>
      {/* <button class="button-dark button-small" onClick$={() => setIsDone(!isDone.value)}>
        click me
      </button> 
      <div class={isDone.value ? 'container' : styles['red']}>
        <a href="https://www.builder.io/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by Builder.io</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}</span>
        </a>
      </div> */}
      {/*  <QwikLogo width={60} /> */}
      <div class={flexParentWrap}>
        <div class={flexContainer}>
          <div class={section}>
            <div>Address</div>
            <p class={paragraph}>
              The Gentleman LLC
              <br />
              1234 Elm Street
              <br />
              Suite 567
              <br />
              Springfield, IL 62704
              <br />
              United States
              <br />
              EIN: 12-3456789
            </p>
          </div>
          <div class={section}>Buy on The Gentleman</div>
          <div class={section}>Sell on The Gentleman</div>
          <div class={section}>customer service</div>
          <div class={section}>
            Customer Service
            <p class={paragraph}>
              e:{' '}
              <a href="mailto:velmarcor79@gmail.com" class={link}>
                velmarcor79@gmail.com
              </a>
              <br />
              t:{' '}
              <a href="tel:00393714200848" class={link}>
                +39 371 420 0848
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
