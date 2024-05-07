export interface Product {
  id: string;
  url: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  created_at: string;
  description: string;
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
  slug: string;
  category_slug: string;
}

export interface CartProps {
  products: ProductDetailsProps[];
  total: number;
}

export interface SellerAmountMap {
  [sellerId: string]: number;
}
