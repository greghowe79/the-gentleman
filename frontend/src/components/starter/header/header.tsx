import { component$, $, useContext } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.module.css';
import { Link } from '@builder.io/qwik-city';
import { IconsMenu } from '~/components/icons-menu/component/iconsMenu';
import { ListMenu } from '~/components/list-menu/component/listMenu';
import { UserSessionContext } from '~/root';

interface ToggleProps {
  openPanel: { isOpen: boolean };
  iconKey?: { number: string };
  location: string;
}

export const Header = component$<ToggleProps>(({ openPanel, iconKey, location }) => {
  const userSession = useContext(UserSessionContext);
  const open = $(() => {
    openPanel.isOpen = true;
  });

  return (
    <header>
      <nav class={styles.header}>
        <div class={styles.logo} aria-label="The Gentleman">
          <Link href="/" title="TG TheGentleman" aria-label="The Gentleman">
            <QwikLogo height={90} width={110} />
          </Link>
        </div>

        <div class={styles['list-container']} style={{ display: location === 'http://localhost/dashboard-seller/' ? 'none' : 'block' }}>
          <ListMenu userSession={userSession} />
        </div>
        <div class={styles['icons-container']} style={{ display: location === 'http://localhost/dashboard-seller/' ? 'none' : 'block' }}>
          <IconsMenu open={open} iconKey={iconKey} />
        </div>
      </nav>
    </header>
  );
});
