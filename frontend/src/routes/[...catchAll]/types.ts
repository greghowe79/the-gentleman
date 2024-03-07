import { type Signal } from '@builder.io/qwik';
import { type UserSess } from '~/root';

export interface Service {
  id: string;
  url: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  created_at: string;
  description: string;
  sku: string;
  categorySlug: string;
}

export interface ProductDetailsProps {
  id: string;
  user_id: string | null;
  order_id: string | null;
  url: string;
  product_id: string;
  price: number;
  sku: string;
  quantity: number;
  product_name: string;
  amount: number;
}

export interface CartProps {
  products: ProductDetailsProps[];
  total: number;
}

export interface AddToCartParams {
  isFromPdp: boolean;
  userSession: UserSess;
  cart: Signal<CartProps>;
  product?: ProductDetailsProps | null;
  selectedOption?: Signal<string>;
  service?: Readonly<Signal<Service[]>>;
}
