export interface Product {
  id: number;
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  category: string;
  created_at: string;
  description: string;
  url: string;
}

export interface itemProps {
  id: string;
  sku: string;
  name: string;
  url: string;
  price: number;
  description: string;
  created_at: string;
  category: string;
}
