import { type Signal, type QRL } from '@builder.io/qwik';
import type { CartProps } from '~/utils/product_detail_page_utils/types';

export interface ToggleProps {
  openPanel: { isOpen: boolean };
  closed?: QRL<() => void>;
  iconKey?: { number: string };

  cart?: Signal<CartProps>;
}
