import { type Signal, $ } from '@builder.io/qwik';
import type { UserSess } from '~/root';
import { supabase } from './supabase';
import type { FileObject } from '@supabase/storage-js/dist/module/lib/types';

const replaceImage = $(async (userSession: UserSess, file: FileObject, currentFile: Signal<any>) => {
  const { data: updatedImage, error } = await supabase.storage.from('shop').update(userSession.userId + '/' + file.name, currentFile.value);
  if (error) {
    console.error('Error updating image:', error.message);
    return;
  }
  console.log('UPDATED IMAGE', updatedImage);
});

const updateImgStorage = $(async (userSession: UserSess, imageIndex: Signal<number>, currentFile: Signal<any>) => {
  const { data: files } = await supabase.storage.from('shop').list(userSession.userId + '/');
  const file = files?.[imageIndex.value];
  if (file) replaceImage(userSession, file, currentFile);
});

export { updateImgStorage };
