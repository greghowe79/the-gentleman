import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { menuItems } from '../data/data';
import { getAdminUserId } from '../actions';
import { type UserSess } from '~/root';
interface ListMenuProps {
  userSession: UserSess;
}

export const ListMenu = component$<ListMenuProps>(({ userSession }) => {
  const adminUserId = useSignal('');

  /// DA RIVEDERE LO USETASK BISOGNA CONFRONTARE L'adminUserId con userSession.userId
  useTask$(async () => {
    await getAdminUserId(adminUserId);
  });

  return (
    <ul>
      {menuItems.map((item) => (
        <li key={item.id}>
          <Link href={item.url}>
            {item.id === 2 && userSession.isLoggedIn && userSession.charges_enabled ? 'Dashboard seller' : item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
});
