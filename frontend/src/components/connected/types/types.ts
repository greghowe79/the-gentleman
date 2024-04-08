import type { JSX } from '@builder.io/qwik/jsx-runtime';

export interface BalanceItem {
  amount: number;
  currency: string;
  source_types: {
    card: number;
  };
}

export interface BalanceProps {
  object: string;
  available: BalanceItem[];
  livemode: boolean;
  pending: BalanceItem[];
}

export interface ConnectedProps {
  balance?: BalanceProps;
}

export interface ComponentProps {
  id: number;
  child: JSX.Element;
}
