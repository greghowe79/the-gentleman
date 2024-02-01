import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { menuItems, newMenuItem } from '../data/data';
import { UserSessionContext } from '~/root';
import { getAdminUserId } from '../actions';

export const ListMenu = component$(() => {
  const adminUserId = useSignal('');
  const userSession = useContext(UserSessionContext);

  useTask$(async () => {
    await getAdminUserId(adminUserId);
  });

  const menuList = userSession.isLoggedIn && userSession.userId === adminUserId.value ? [...menuItems, newMenuItem] : menuItems;

  return (
    <ul>
      {menuList.map((item) => (
        <li key={item.id}>
          <Link href={item.url}>{item.text}</Link>
        </li>
      ))}
    </ul>
  );
});
