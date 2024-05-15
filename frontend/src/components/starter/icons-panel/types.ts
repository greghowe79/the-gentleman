import { type Signal, type QRL } from '@builder.io/qwik';
import type { CartProps } from '~/utils/product_detail_page_utils/types';

export interface ToggleProps {
  closed?: QRL<() => void>;

  cart?: Signal<CartProps>;
}
