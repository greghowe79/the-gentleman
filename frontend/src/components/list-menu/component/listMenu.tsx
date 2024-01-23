import { component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { menuItems, newMenuItem } from '../data/data';
import { UserSessionContext } from '~/root';

export const ListMenu = component$(() => {
  const userSession = useContext(UserSessionContext);
  const menuList = userSession.isLoggedIn ? [...menuItems, newMenuItem] : menuItems;
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
