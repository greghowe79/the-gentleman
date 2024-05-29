import { $, type Signal } from '@builder.io/qwik';
import { supabase } from '../supabase';
import type { ImageChangeCheckerProps, Product, ProductTableUpdateProps, ProductUpdateProps } from './types';
import type { UserSess } from '~/root';

const checkImageHasBeenChanged = $(async (imageChangeCheckerParams: ImageChangeCheckerProps): Promise<boolean> => {
  const { selectedFile, receivedFileName } = imageChangeCheckerParams;
  return selectedFile.value !== receivedFileName;
});

const updateProductTable = $(async (productTableUpdateParams: ProductTableUpdateProps) => {
  const { id, selectedFile, productName, productPrice, productDescription, productSlug, imageUrl } = productTableUpdateParams;
  const { error } = await supabase
    .from('products')
    .update({
      file_name: selectedFile.value,
      name: productName.value,
      price: parseFloat(productPrice.value),
      description: productDescription.value,
      slug: productSlug.value,
      url: imageUrl.value,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating product:', error.message);
    return;
  }
  console.log('PRODUCTS TABLE UPDATED');
});

const updateShopCategoryTable = $(
  async (categorySlug: Signal<string>, userSession: UserSess, id: string, productUpdateParams: ProductUpdateProps) => {
    const { name, slug, price, description, url } = productUpdateParams;
    const { data: categoryProducts, error: newCategoryError } = await supabase
      .from('shop_categories')
      .select('products')
      .eq('slug', categorySlug.value);

    if (newCategoryError) {
      console.error(newCategoryError);
      return;
    }

    const productIndex = categoryProducts[0]?.products.findIndex(
      (product: Product) => product.seller === userSession.stripe_seller?.id && product.id === id
    );
    if (productIndex !== -1) {
      const product = categoryProducts[0]?.products[productIndex];
      product.name = name;
      product.slug = slug;
      product.price = price;
      product.description = description;
      product.url = url;

      const { error: updateCategoryError } = await supabase
        .from('shop_categories')
        .update({ products: categoryProducts[0].products })
        .eq('slug', categorySlug.value);

      if (updateCategoryError) {
        console.error(updateCategoryError);
        return;
      }
    }
  }
);

const updateShopTable = $(async (userSession: UserSess, id: string, productUpdateParams: ProductUpdateProps) => {
  const { name, slug, price, description, url } = productUpdateParams;
  const { data: shopProducts, error: newShopError } = await supabase.from('shop').select('products').eq('id', 1);

  if (newShopError) {
    console.error(newShopError);
    return;
  }

  const productIndex = shopProducts[0]?.products.findIndex(
    (product: Product) => product.seller === userSession.stripe_seller?.id && product.id === id
  );
  if (productIndex !== -1) {
    const product = shopProducts[0]?.products[productIndex];
    product.name = name;
    product.slug = slug;
    product.price = price;
    product.description = description;
    product.url = url;

    const { error: updateShopError } = await supabase.from('shop').update({ products: shopProducts[0].products }).eq('id', 1);

    if (updateShopError) {
      console.error(updateShopError);
      return;
    }
  }
});

export { checkImageHasBeenChanged, updateProductTable, updateShopCategoryTable, updateShopTable };
