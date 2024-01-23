import { component$, $, useSignal } from '@builder.io/qwik';
import { icons } from '../data/data';
import { type IconMenuProps } from '../types/types';

export const IconsMenu = component$<IconMenuProps>(({ open, iconKey }) => {
  const currentElm = useSignal<HTMLElement | null>(null);
  const targetElm = useSignal<HTMLElement | null>(null);

  const checkTarget = $((event: any, currentTarget: HTMLLIElement) => {
    currentElm.value = currentTarget;
    targetElm.value = event.target as HTMLElement;
    if (iconKey) {
      const qKey = currentElm.value.getAttribute('q:key');
      iconKey.number = qKey !== null ? qKey : ''; // Provide a default value (an empty string) if qKey is null
    }
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
