import { type QwikChangeEvent, type Signal, $, type QwikKeyboardEvent } from '@builder.io/qwik';
import { supabase } from './supabase';
import { type UserSess } from '~/root';
import { v4 as uuidv4 } from 'uuid';
import { type ShopTableProduct, type ItemProps, type ShopCategoriesTableProduct } from '~/routes/shop/types/types';

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

export const uploadImage = $(async (e: QwikChangeEvent<HTMLInputElement>, currentFile: Signal<any>, selectedFile: Signal<string>) => {
  const file = e.target.files?.[0];
  if (file) {
    currentFile.value = file;
    selectedFile.value = file.name;
  }
});

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
    sortBy: { column: 'created_at', order: 'asc' },
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
      await getImages(userSession, images);
    } else {
      console.log(error);
    }
  }
);

export const generateSku = $((productId: string, productName: string, productDescription: string, sequence: Signal<number>): string => {
  const sku = `${productId.substring(0, 2)}-${productName.substring(0, 2)}-${productDescription.substring(0, 2)}-${sequence.value}`;
  sequence.value = sequence.value + 1;
  return sku;
});

export const getProducts = $(async (productsTable: Signal<ItemProps[]>) => {
  const { data, error } = await supabase.from('products').select('*');
  if (data !== null) {
    productsTable.value = data;
  } else {
    console.log(error);
  }
});

export const insertIntoTheProductTable = $(async (itemToInsert: ItemProps, productsTable: Signal<ItemProps[]>) => {
  const { error: insertProductError } = await supabase.from('products').insert(itemToInsert);
  getProducts(productsTable);
  if (insertProductError) {
    console.error(insertProductError);
  }
});

export const deleteShopProduct = $(async (id: number, productId: string) => {
  try {
    const { data: shopData, error: shopError } = await supabase.from('shop').select('products').eq('id', id).single();

    if (shopError) {
      console.error(shopError.message);
      return;
    }

    const productIndex = shopData.products.findIndex((product: ShopTableProduct) => product.id === productId);
    if (productIndex !== -1) {
      shopData.products.splice(productIndex, 1);
      const { error: updateError } = await supabase.from('shop').update({ products: shopData.products }).eq('id', id).single();
      if (updateError) {
        console.error(updateError.message);
        return;
      }
      //console.log('Oggetto eliminato con successo.');
    } else {
      //console.log('Oggetto non trovato.');
    }
  } catch (error) {
    console.error(error);
  }
});

export const deleteShopCategoryProduct = $(async (category: string, productId: string) => {
  try {
    const { data: shopCategoryData, error: shopCategoryError } = await supabase
      .from('shop_categories')
      .select('products')
      .eq('category_title', category)
      .single();
    if (shopCategoryError) {
      console.error(shopCategoryError.message);
      return;
    }

    const productIndex = shopCategoryData.products.findIndex((product: ShopCategoriesTableProduct) => product.id === productId);
    if (productIndex !== -1) {
      shopCategoryData.products.splice(productIndex, 1);
      const { error: updateError } = await supabase
        .from('shop_categories')
        .update({ products: shopCategoryData.products })
        .eq('category_title', category)
        .single();
      if (updateError) {
        console.error(updateError.message);
        return;
      }
      //console.log('Oggetto eliminato con successo.');
    } else {
      //console.log('Oggetto non trovato.');
    }
  } catch (error) {
    console.error(error);
  }
});

export const deleteImage = $(async (userSession: UserSess, imageName: string, images: Signal<any>) => {
  const { error } = await supabase.storage.from('shop').remove([userSession.userId + '/' + imageName]);

  if (error) {
    console.error(error);
  } else {
    await getImages(userSession, images);
  }
});

export const deleteProductsProduct = $(async (productId: string, productsTable: Signal<ItemProps[]>) => {
  const { error: productsError } = await supabase.from('products').delete().eq('id', productId);
  if (productsError) {
    console.error(productsError);
  } else {
    await getProducts(productsTable);
  }
});
