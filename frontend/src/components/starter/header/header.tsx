import { component$, $, useContext, useSignal } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.module.css';
import { Link } from '@builder.io/qwik-city';
import { IconsMenu } from '~/components/icons-menu/component/iconsMenu';
import { ListMenu } from '~/components/list-menu/component/listMenu';
import { createConnectAccount } from '~/utils/stripe';
import { UserSessionContext } from '~/root';

interface ToggleProps {
  openPanel: { isOpen: boolean };
  iconKey?: { number: string };
  location: string;
}

export const Header = component$<ToggleProps>(({ openPanel, iconKey, location }) => {
  const open = $(() => {
    openPanel.isOpen = true;
  });
  const userSession = useContext(UserSessionContext);
  const loading = useSignal(false);

  const handleClick = $(async () => {
    loading.value = true;

    try {
      const res = await createConnectAccount(userSession.userId);
      console.log(res); // get the login link
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  });

  return (
    <header>
      <nav class={styles.header}>
        <div class={styles.logo} aria-label="The Gentleman">
          <Link href="/" title="TG TheGentleman" aria-label="The Gentleman">
            <QwikLogo height={90} width={110} />
          </Link>
        </div>
        <button
          disabled={loading.value}
          onClick$={() => handleClick()}
          style={{ display: location !== 'http://localhost/become-a-seller/' ? 'none' : 'block', marginRight: '30px' }}
        >
          {loading.value ? 'Processing...' : 'Setup Payouts'}
        </button>
        <div class={styles['list-container']} style={{ display: location === 'http://localhost/become-a-seller/' ? 'none' : 'block' }}>
          <ListMenu />
        </div>
        <div class={styles['icons-container']} style={{ display: location === 'http://localhost/become-a-seller/' ? 'none' : 'block' }}>
          <IconsMenu open={open} iconKey={iconKey} />
        </div>
      </nav>
    </header>
  );
});
