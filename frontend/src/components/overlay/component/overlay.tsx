import { component$ } from '@builder.io/qwik';
import styles from '../styles/overlay.module.css';
import { type ToggleProps } from '~/components/starter/icons-panel/types';

export const Overlay = component$<ToggleProps>(({ openPanel, closed }) => {
  return (
    <div
      class={styles['overlay']}
      onClick$={() => closed?.()}
      style={{
        zIndex: openPanel.isOpen ? 10 : 0,
        background: openPanel.isOpen ? 'rgba(0, 0, 0, 0.6)' : '',
      }}
    />
  );
});
