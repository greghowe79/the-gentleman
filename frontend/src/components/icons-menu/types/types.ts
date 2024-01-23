import { type QRL } from '@builder.io/qwik';

export interface IconMenuProps {
  open: QRL<() => void>;
  iconKey?: { number: string };
}
