import { component$, $, useContext } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.module.css';
import { Link } from '@builder.io/qwik-city';
import { IconsMenu } from '~/components/icons-menu/component/iconsMenu';
import { ListMenu } from '~/components/list-menu/component/listMenu';
import { OpenPanelContext, UserSessionContext } from '~/root';
import ButtonAddProduct from '~/components/button-add-product/component/button_add_product';
import { isDashboardSeller } from './actions/actions';
import type { ToggleProps } from './types/types';

export const Header = component$<ToggleProps>(({ location }) => {
  const userSession = useContext(UserSessionContext);
  const openPanel = useContext(OpenPanelContext);

  const open = $(() => {
    openPanel.isOpen = true;
  });

  const isSellerDashboard = isDashboardSeller(location);
  const displayButton = isSellerDashboard ? 'block' : 'none';
  const displayListAndIcons = isSellerDashboard ? 'none' : 'block';

  return (
    <header>
      <nav class={styles.header}>
        <div class={styles.logo} aria-label="The Gentleman">
          <Link href="/" title="TG TheGentleman" aria-label="The Gentleman">
            <QwikLogo height={90} width={110} />
          </Link>
        </div>
        <div class={styles['button-wrap']} style={{ display: displayButton }}>
          <ButtonAddProduct />
        </div>

        <div class={styles['list-container']} style={{ display: displayListAndIcons }}>
          <ListMenu userSession={userSession} />
        </div>
        <div class={styles['icons-container']} style={{ display: displayListAndIcons }}>
          <IconsMenu open={open} />
        </div>
      </nav>
    </header>
  );
});
