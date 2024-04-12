import type { Signal } from '@builder.io/qwik';

export interface SellerProduct {
  id: string;
  sku: string;
  name: string;
  url: string;
  price: number;
  description: string;
  created_at: string;
  category: string;
  user_id: string;
  seller: string;
}

export interface Column {
  id: number;
  label: string;
}
export interface SellerProductsProps {
  products: Signal<SellerProduct[]>;
  columns: Column[];
}
