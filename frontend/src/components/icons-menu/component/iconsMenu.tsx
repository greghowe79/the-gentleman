import { component$, $, useSignal, useContext } from '@builder.io/qwik';
import { icons } from '../data/data';
import { type IconMenuProps } from '../types/types';
import { IconKeyContext } from '~/root';

export const IconsMenu = component$<IconMenuProps>(({ open }) => {
  const currentElm = useSignal<HTMLElement | null>(null);
  const targetElm = useSignal<HTMLElement | null>(null);
  const iconKey = useContext(IconKeyContext);

  const checkTarget = $((event: any, currentTarget: HTMLLIElement) => {
    currentElm.value = currentTarget;
    targetElm.value = event.target as HTMLElement;
    const qKey = currentElm.value.getAttribute('q:key');
    iconKey.number = qKey !== null ? qKey : ''; // Provide a default value (an empty string) if qKey is null
  });

  return (
    <ul>
      {icons.map((icon) => (
        <li
          key={icon.id}
          onClick$={(event, currentTarget) => {
            open();
            checkTarget(event, currentTarget);
          }}
        >
          {icon.type}
        </li>
      ))}
    </ul>
  );
});
