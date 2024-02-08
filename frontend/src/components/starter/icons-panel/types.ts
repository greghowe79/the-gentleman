import { type Signal, type QRL } from '@builder.io/qwik';
import { type CartProps } from '~/routes/[...catchAll]/types';

export interface ToggleProps {
  openPanel: { isOpen: boolean };
  closed?: QRL<() => void>;
  iconKey?: { number: string };
  // cookie?: Readonly<
  //   Signal<{
  //     [x: string]: any;
  //   }>
  // >;
  cookie?: Readonly<Signal<CartProps>>;
}
