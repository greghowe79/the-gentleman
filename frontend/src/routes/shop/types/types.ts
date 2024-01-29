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

export interface ShopTableProduct {
  id: string;
  sku: string;
  url: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  created_at: string;
  description: string;
  categorySlug: string;
}

export interface ItemProps {
  id: string;
  sku: string;
  name: string;
  url: string;
  price: number;
  description: string;
  created_at: string;
  category: string;
}

export interface ShopCategoriesTableProduct {
  id: string;
  sku: string;
  url: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  created_at: string;
  description: string;
  categorySlug: string;
}
