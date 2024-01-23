import { type QwikChangeEvent, type Signal, $, type QwikKeyboardEvent } from '@builder.io/qwik';
import { supabase } from './supabase';
import { type UserSess } from '~/root';
import { v4 as uuidv4 } from 'uuid';

export const rootDomain = 'http://localhost';

export const validateEmail = (email: string) => {
  const regex = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export const handleChange = $((e: QwikChangeEvent<HTMLInputElement>, input: Signal<string>) => {
  input.value = e.target.value;

  if (input.value.includes('.') && input.value.split('.')[1].length > 2) {
    e.target.value = parseFloat(input.value).toFixed(2);
    input.value = e.target.value;
  }
  return input.value;
});

export const handleTextAreaChange = $((e: QwikChangeEvent<HTMLTextAreaElement>, input: Signal<string>) => {
  input.value = e.target.value;
  return input.value;
});

export const uploadImage = $(
  async (e: QwikChangeEvent<HTMLInputElement>, currentFile: Signal<any>, selectedFile: Signal<string>) => {
    const file = e.target.files?.[0];
    if (file) {
      currentFile.value = file;
      selectedFile.value = file.name;
    }
  }
);

export const handlePriceKeyPress = $((e: QwikKeyboardEvent<HTMLInputElement> & any) => {
  const invalidKeys = ['-', '+', '.'];

  if (invalidKeys.includes(e.key) || [45, 43, 46].includes(e.keyCode) || [45, 43, 46].includes(e.which)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

export const getImages = $(async (userSession: UserSess, images: Signal<any>) => {
  const { data, error } = await supabase.storage.from('shop').list(userSession.userId + '/', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (data !== null) {
    images.value = data;
  } else {
    alert('Error loading images');
    console.log(error);
  }
});

export const uploadImgStorage = $(
  async (userSession: UserSess, currentFile: Signal<any>, imgUrl: Signal<string>, images: Signal<any>, CDNURL: string) => {
    const { data, error } = await supabase.storage.from('shop').upload(userSession.userId + '/' + uuidv4(), currentFile.value);
    if (data) {
      imgUrl.value = CDNURL + data.path;
      console.log('IMG URL', imgUrl.value);
      getImages(userSession, images);
    } else {
      console.log(error);
    }
  }
);
