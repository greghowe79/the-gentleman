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
}
