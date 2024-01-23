import { Link } from '@builder.io/qwik-city';
import styles from '../styles/logout-button.module.css';
import { component$ } from '@builder.io/qwik';
import { type LogoutBtnProps } from '../types/types';

export const LogoutButton = component$<LogoutBtnProps>(({ handleLogout }) => {
  return (
    <>
      <button class={styles['logout-button']} onClick$={handleLogout}>
        <span
          style={{
            color: 'var(--description-color)',
          }}
        >
          Logout
        </span>
      </button>
      <Link href="/login/staging">{/* <ButtonStd title="Dashboard" />  */}</Link>
    </>
  );
});
