import { component$, useContext } from '@builder.io/qwik';
import styles from '../styles/overlay.module.css';
import { type ToggleProps } from '~/components/starter/icons-panel/types';
import { OpenPanelContext } from '~/root';

export const Overlay = component$<ToggleProps>(({ closed }) => {
  const openPanel = useContext(OpenPanelContext);
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
