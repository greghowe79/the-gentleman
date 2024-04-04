export interface BalanceItem {
  amount: number;
  currency: string;
  source_types: {
    card: number;
  };
}

export interface Balance {
  object: string;
  available: BalanceItem[];
  livemode: boolean;
  pending: BalanceItem[];
}

export interface ConnectedProps {
  balance?: Balance;
}
