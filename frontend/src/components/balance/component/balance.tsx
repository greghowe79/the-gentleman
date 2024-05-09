import { component$ } from '@builder.io/qwik';
import type { BalanceItem, ConnectedProps } from '~/components/connected/types/types';
import { balanceStyle, currencyContainer, spanLabel } from '../styles/styles.css';
import { currencyFormatter } from '~/utils/stripe';

const Balance = component$<ConnectedProps>(({ balance }) => {
  return (
    <div class={balanceStyle}>
      {balance?.available.map((ba: BalanceItem, index: number) => {
        return (
          <div key={index} class={currencyContainer}>
            <span>{currencyFormatter(ba)}</span>
            <span class={spanLabel}>Available</span>
          </div>
        );
      })}
    </div>
  );
});

export default Balance;
