import { type Signal, type QRL } from '@builder.io/qwik';

export interface ToggleProps {
  openPanel: { isOpen: boolean };
  closed?: QRL<() => void>;
  iconKey?: { number: string };
  cookie?: Readonly<
    Signal<{
      [x: string]: any;
    }>
  >;
}
