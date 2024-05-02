import { $ } from '@builder.io/qwik';
import { supabase } from '../supabase';
import type { ImageBucketReplacementProps, ImageChangeCheckerProps, ProductTableUpdateProps } from './types';

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

export { checkImageHasBeenChanged, updateProductTable, replaceImageInBucket };
