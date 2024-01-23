import { component$, useSignal, $ } from '@builder.io/qwik';
import { useServerTimeLoader } from '~/routes/layout';
import styles from './footer.module.css';

export default component$(() => {
  const isDone = useSignal(true);

  const setIsDone = $((newValue: boolean) => {
    isDone.value = newValue;
  });

  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <button
        class="button-dark button-small"
        onClick$={() => setIsDone(!isDone.value)}
      >
        click me
      </button>
      <div class={isDone.value ? 'container' : styles['red']}>
        <a href="https://www.builder.io/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by Builder.io</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
});
