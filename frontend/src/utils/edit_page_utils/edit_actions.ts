import { type Signal, $ } from '@builder.io/qwik';
import type { UserSess } from '~/root';
import { supabase } from '../supabase';

const replaceImageInBucket = $(async (userSession: UserSess, imageName: string, currentFile: Signal<any>) => {
  const { data: updatedImage, error } = await supabase.storage.from('shop').update(userSession.userId + '/' + imageName, currentFile.value);
  if (error) {
    console.error('Error replacing image:', error.message);
    return;
  }
  console.log('UPDATED IMAGE', updatedImage);
});

const checkImageHasBeenChanged = $(async (selectedFile: Signal<string>, receivedFileName: string): Promise<boolean> => {
  return selectedFile.value !== receivedFileName;
});

const updateProductTable = $(async (id: string, selectedFile: Signal<string>) => {
  const { error } = await supabase.from('products').update({ file_name: selectedFile.value }).eq('id', id);

  if (error) {
    console.error('Error updating product:', error.message);
    return;
  }
  console.log('PRODUCTS TABLE UPDATED');
});

export { checkImageHasBeenChanged, updateProductTable, replaceImageInBucket };
