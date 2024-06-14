export interface Category {
  id: number;
  category_description: string;
  products: any[];
  slug: string;
  category_title: string;
  image_url: string;
}

export interface ShopCategoriesProps {
  shopCategories: Category[];
}
