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
