import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { parent, div1, div2, div3, div4, div5, div6, balanceStyle, uploadButton } from '../styles/style.css';
import { currencyFormatter } from '~/utils/stripe';
import type { BalanceItem, ConnectedProps } from './types/types';

const Connected = component$<ConnectedProps>(({ balance }) => {
  return (
    <div class={parent}>
      <div class={div1}>div1</div>
      <div class={div2}>div2</div>
      <div class={div3}>div3</div>
      <div class={div4}>div4</div>
      <div class={div5}>
        <Link href="/upload-products">
          <button class={uploadButton}>Upload products</button>
        </Link>
      </div>
      <div class={div6}>Payout settings</div>
      <div class={balanceStyle}>
        {balance?.pending.map((ba: BalanceItem, index: number) => {
          return <span key={index}>{currencyFormatter(ba)}</span>;
        })}
      </div>
    </div>
  );
});

export default Connected;
