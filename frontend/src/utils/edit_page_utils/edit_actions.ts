import { $, type Signal } from '@builder.io/qwik';
import { supabase } from '../supabase';
import type { ImageBucketReplacementProps, ImageChangeCheckerProps, ProductTableUpdateProps } from './types';
import type { UserSess } from '~/root';

const replaceImageInBucket = $(async (imageBucketReplacementParams: ImageBucketReplacementProps) => {
  const { userSession, imageName, currentFile } = imageBucketReplacementParams;
  const { data: updatedImage, error } = await supabase.storage.from('shop').update(userSession.userId + '/' + imageName, currentFile.value);
  if (error) {
    console.error('Error replacing image:', error.message);
    return;
  }
  console.log('UPDATED IMAGE', updatedImage);
});

const checkImageHasBeenChanged = $(async (imageChangeCheckerParams: ImageChangeCheckerProps): Promise<boolean> => {
  const { selectedFile, receivedFileName } = imageChangeCheckerParams;
  return selectedFile.value !== receivedFileName;
});

const updateProductTable = $(async (productTableUpdateParams: ProductTableUpdateProps) => {
  const { id, selectedFile, productName, productPrice, productDescription, productSlug } = productTableUpdateParams;
  const { error } = await supabase
    .from('products')
    .update({
      file_name: selectedFile.value,
      name: productName.value,
      price: parseFloat(productPrice.value),
      description: productDescription.value,
      slug: productSlug.value,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error.message);
    return;
  }
  console.log('PRODUCTS TABLE UPDATED');
});

const updateShopCategoryTable = $(async (categorySlug: Signal<string>, userSession: UserSess, id: string) => {
  const { data: categoryProducts, error: newCategoryError } = await supabase
    .from('shop_categories')
    .select('products')
    .eq('slug', categorySlug.value);

  if (newCategoryError) {
    console.error(newCategoryError);
    return;
  }

  const sellerProducts = categoryProducts[0]?.products.filter((product: any) => product.seller === userSession.stripe_seller?.id);

  const sellerProduct = sellerProducts.filter((product: any) => product.id === id);
  console.log('sellerProduct', sellerProduct);
});

export { checkImageHasBeenChanged, updateProductTable, replaceImageInBucket, updateShopCategoryTable };
