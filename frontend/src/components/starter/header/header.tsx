import { component$, $, useContext } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.module.css';
import { Link } from '@builder.io/qwik-city';
import { IconsMenu } from '~/components/icons-menu/component/iconsMenu';
import { ListMenu } from '~/components/list-menu/component/listMenu';
import { NavbarContext, OpenPanelContext, UserSessionContext } from '~/root';
import ButtonAddProduct from '~/components/button-add-product/component/button_add_product';
import { isDashboardSeller } from './actions/actions';
import type { ToggleProps } from './types/types';

export const Header = component$<ToggleProps>(({ location }) => {
  const userSession = useContext(UserSessionContext);
  const openPanel = useContext(OpenPanelContext);

  const isNavbarVisible = useContext(NavbarContext);
  const open = $(() => {
    openPanel.isOpen = true;
  });

  const isSellerDashboard = isDashboardSeller(location);
  const displayButton = isSellerDashboard ? 'block' : 'none';
  const displayListAndIcons = isSellerDashboard ? 'none' : 'block';
  //const isFilterVisible = useContext(FiltersContext);

  return (
    <header>
      <nav class={`${styles.header} ${isNavbarVisible.value ? '' : styles.hidden} `}>
        {/* ${isFilterVisible.value ? '' : styles.hidden} */}
        <div class={styles.logo} aria-label="Professione Corsa">
          <Link href="/" title="Professione Corsa" aria-label="Professione Corsa" style={{ display: 'flex' }}>
            <QwikLogo height={80} width={80} />
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
