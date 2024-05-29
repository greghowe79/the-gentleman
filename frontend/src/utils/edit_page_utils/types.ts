import type { Signal } from '@builder.io/qwik';
import type { UserSess } from '~/root';

export interface ImageChangeCheckerProps {
  selectedFile: Signal<string>;
  receivedFileName: string;
}

export interface ImageBucketReplacementProps {
  userSession: UserSess;
  imageName: string;
  currentFile: Signal<any>;
}

export interface ProductTableUpdateProps {
  id: string;
  selectedFile: Signal<string>;
  productName: Signal<string>;
  productPrice: Signal<string>;
  productDescription: Signal<string>;
  productSlug: Signal<string>;
  imageUrl: Signal<string>;
}

export interface ProductUpdateProps {
  name: string;
  slug: string;
  price: number;
  description: string;
  url: string;
}

export interface Product {
  id: string;
  sku: string;
  url: string;
  name: string;
  slug: string;
  price: number;
  seller: string;
  user_id: string;
  category: string;
  created_at: string;
  description: string;
  categorySlug: string;
}
