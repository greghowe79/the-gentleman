import { component$, $, useStore, useSignal, useVisibleTask$, useContext } from '@builder.io/qwik';
import styles from './toggle-panel.module.css';
import { Overlay } from '~/components/overlay/component/overlay';
import { ShoppingBag } from '~/components/shopping-bag/component/shoppingBag';
import { SearchBar } from '~/components/search-bar/component/searchBar';
import { MenuLanguages } from '~/components/menu-languages/component/menuLanguages';
import { Login } from '~/components/login/component/login';
import { SignUp } from '~/components/signup/component/signup';
import { LogoutButton } from '~/components/logout-button/component/logoutButton';
import { type ToggleProps } from './types';
import { UserSessionContext } from '~/root';
import { supabase } from '~/utils/supabase';
import { useNavigate } from '@builder.io/qwik-city';

export const IconsPanel = component$<ToggleProps>(({ openPanel, iconKey, cookie }) => {
  const userSession = useContext(UserSessionContext);
  const isSession = useSignal(false);
  const nav = useNavigate();

  const closed = $(() => {
    openPanel.isOpen = false;
  });
  const isLoginForm = useStore({ active: false });

  const { number } = iconKey || {};

  // Handle Logout
  const handleLogout = $(async () => {
    // !!!   Handle serverside logout !!!!!!!!!!
    //Handle client side
    await supabase.auth.signOut();
    nav('/');
  });

  useVisibleTask$(({ track }) => {
    track(userSession);
    // console.log('User Session', userSession);
    if (userSession.isLoggedIn) {
      isSession.value = true;
    } else {
      isSession.value = false;
    }
  });

  const TogglePanelStyles = {
    transform: openPanel.isOpen ? 'translateX(0%)' : 'translateX(100%)',
    boxShadow: openPanel.isOpen ? '-10px 0 10px rgba(0, 0, 0, 0.5)' : 'none',
    justifyContent: iconKey?.number === '2' ? 'center' : 'unset',
  };

  return (
    <>
      {number === '2' && isSession.value ? (
        <LogoutButton handleLogout={handleLogout} />
      ) : (
        <>
          <Overlay openPanel={openPanel} closed={closed} />
          <div class={styles['toggle-panel']} style={TogglePanelStyles}>
            {number === '0' && <ShoppingBag text={'Your Shopping Bag is empty'} closed={closed} cookie={cookie} />}
            {number === '1' && <SearchBar />}
            {number === '2' && (isLoginForm.active ? <Login isLoginForm={isLoginForm} /> : <SignUp isLoginForm={isLoginForm} />)}
            {number === '3' && <MenuLanguages />}
          </div>
        </>
      )}
    </>
  );
});

export default IconsPanel;
