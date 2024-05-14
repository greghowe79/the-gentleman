import { component$, useContext, $, useSignal, useTask$, type Signal } from '@builder.io/qwik';
import { ImagesContext, ProductsTableContext, UserSessionContext } from '~/root';
import {
  formContainer,
  form,
  input,
  label,
  preview,
  previewContainer,
  labelWrapper,
  prevWrap,
  flexWrapper,
  grid,
  containerBlock,
  slidingContainer,
  imageWrap,
  button,
  prodNameInputWrap,
  ctaWrap,
  prodDescrTextWrap,
  textAreaStyle,
  buttonIcon,
} from './style.css';
import styles from '../../components/search-bar/styles/search-bar.module.css';
import { supabase } from '~/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import {
  deleteImage,
  //deleteProductsProduct,
  deleteShopCategoryProduct,
  deleteShopProduct,
  generateSku,
  getImages,
  getProducts,
  handleChange,
  handlePriceKeyPress,
  handleTextAreaChange,
  insertIntoTheProductTable,
  uploadImage,
  uploadImgStorage,
} from '~/utils/helpers';
import { Image } from '@unpic/qwik';
import CustomSelect from '~/components/select-categories/component/customSelect';
import { categoryOptions } from '../../components/select-categories/data/data';
import type { ShopCategoriesTableProduct, ItemProps } from '../shop/types/types';
import BinIcon from '~/components/starter/icons/bin';

const CDNURL = 'https://oukztwgobbpvjuhlvpft.supabase.co/storage/v1/object/public/shop/';

const UploadProducts = component$(() => {
  const productName = useSignal('');
  const productSlug = useSignal('');
  const categorySlug = useSignal('');
  const productDescription = useSignal('');
  const productPrice = useSignal('');
  const imgUrl = useSignal('');
  const userSession = useContext(UserSessionContext);
  const images = useContext(ImagesContext);
  const selectedFile = useSignal('No file currently selected for upload');
  const currentFile: Signal<any> = useSignal();
  const isPreview = useSignal(false);
  const selectedOption = useSignal('');
  const sequence = useSignal(1);
  const productsTable = useContext(ProductsTableContext);

  useTask$(async ({ track }) => {
    track(() => userSession.userId);
    if (userSession.isLoggedIn) {
      await getImages(userSession, images);
      await getProducts(productsTable);
    }
  });

  const handleSubmit = $(async () => {
    if (!currentFile.value) return;

    await uploadImgStorage(userSession, currentFile, imgUrl, images, CDNURL);

    // Genera un nuovo ID univoco utilizzando uuid
    const newProductId = uuidv4();

    const newSKU = await generateSku(newProductId, productName.value, productDescription.value, sequence);

    // Ottieni la data corrente in formato ISO
    const currentDate = new Date().toISOString();

    // Crea un nuovo oggetto prodotto con l'ID generato e i dati del form
    const newProduct: ShopCategoriesTableProduct = {
      id: newProductId,
      sku: newSKU,
      name: productName.value,
      slug: productSlug.value,
      categorySlug: categorySlug.value,
      url: imgUrl.value,
      price: parseFloat(productPrice.value),
      created_at: currentDate,
      description: productDescription.value,
      category: selectedOption.value,
      user_id: userSession.userId,
      seller: userSession.stripe_seller?.id,
    };

    const itemToInsert = {
      id: newProductId,
      sku: newSKU,
      name: productName.value,
      url: imgUrl.value,
      price: parseFloat(productPrice.value),
      description: productDescription.value,
      created_at: currentDate,
      category: selectedOption.value,
      user_id: userSession.userId,
      seller: userSession.stripe_seller?.id,
      slug: productSlug.value,
      file_name: selectedFile.value,
      category_slug: categorySlug.value,
    };

    await insertIntoTheProductTable(itemToInsert, productsTable);

    // NUOVO CODICE DI TEST PER SELEZIONARE LA CATEGORIA
    const { data: categoryProducts, error: newCategoryError } = await supabase
      .from('shop_categories')
      .select('products')
      .eq('category_title', selectedOption.value);

    if (newCategoryError) {
      console.error(newCategoryError);
      return;
    }

    const updatedCategoryProducts = [...categoryProducts[0].products, newProduct];
    const { data: newCategoryRecord, error: updateCategoryError } = await supabase
      .from('shop_categories')
      .update({ products: updatedCategoryProducts })
      .eq('category_title', selectedOption.value);

    if (updateCategoryError) {
      console.error(updateCategoryError);
      return;
    }
    console.log('Record Category updated successfully', newCategoryRecord);

    // FINE DEL CODICE DI TEST

    const { data: products, error: newError } = await supabase.from('shop').select('products').match({ id: 1 });

    if (newError) {
      console.error(newError);
      return;
    }

    const updatedProducts = [...products[0].products, newProduct];
    const { data: newRecord, error: updateError } = await supabase.from('shop').update({ products: updatedProducts }).match({ id: 1 });
    if (updateError) {
      console.error(updateError);
      return;
    }
    console.log('Record updated successfully', newRecord);
  });

  return (
    <>
      {userSession.isLoggedIn && (
        <div class={formContainer}>
          <div class={containerBlock}>
            <form class={[form, 'form']} onSubmit$={handleSubmit} preventdefault:submit>
              <CustomSelect
                isFromEditPage={false}
                selectedOption={selectedOption}
                categorySlug={categorySlug}
                options={categoryOptions}
                exist={true}
                placeholder={'Please choose a category'}
              />
              <div class={prodNameInputWrap}>
                <div class={flexWrapper}>
                  <div class={labelWrapper}>
                    <label for="image_uploads" class={label}>
                      <div>Upload</div>
                    </label>
                    <input
                      class={input}
                      type="file"
                      id="image_uploads"
                      name="image_uploads"
                      accept=".png, .jpg, .jpeg, .avif"
                      onChange$={(e) => uploadImage(e, currentFile, selectedFile)}
                      required
                    />
                  </div>
                  <div class={previewContainer}>
                    <div class={prevWrap}>
                      <p class={preview}>{selectedFile.value}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class={prodNameInputWrap}>
                <label for="product" class={styles['label']}>
                  <input
                    type="text"
                    id="product"
                    name="product"
                    placeholder="Product name"
                    class={styles['input']}
                    required
                    onChange$={(e) => handleChange(e, productName, productSlug)}
                  />
                </label>
              </div>

              <div class={prodNameInputWrap}>
                <label for="price" class={styles['label']}>
                  <input
                    min={0}
                    onKeyPress$={(e) => handlePriceKeyPress(e)}
                    step="any"
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price including taxes (VAT - GST)"
                    class={styles['input']}
                    required
                    onChange$={(e) => handleChange(e, productPrice)}
                  />
                </label>
              </div>
              <div class={prodDescrTextWrap}>
                <label for="prodDescription" style={{ display: 'none' }}></label>

                <textarea
                  id="prodDescription"
                  class={[textAreaStyle, 'text-area-style']}
                  onChange$={(e) => handleTextAreaChange(e, productDescription)}
                  rows={6}
                  cols={50}
                  placeholder="Product description"
                  required
                />
              </div>
              <div class={ctaWrap}>
                <button class={button} type="button" onClick$={() => (isPreview.value = true)}>
                  Preview
                </button>
                <button class={button} type="button" onClick$={() => (isPreview.value = false)}>
                  Images
                </button>
                <button class={button} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div class={[slidingContainer, 'sliding-container']}>
            {isPreview.value ? (
              <div style={{ background: 'red' }}>Ciao</div>
            ) : (
              <div class={grid}>
                {images.value &&
                  images.value.length > 0 &&
                  productsTable.value.map((product: ItemProps, index: number) => {
                    const imageUrl = CDNURL + userSession.userId + '/' + images.value?.[index]?.name;

                    return (
                      <div key={product.id} class={imageWrap}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '250px',
                          }}
                        >
                          <Image src={imageUrl} layout="constrained" decoding="async" loading="lazy" alt="A lovely bath" />
                        </div>

                        <button
                          class={buttonIcon}
                          onClick$={() => [
                            deleteImage(userSession, images.value[index]?.name, images),
                            deleteShopProduct(1, product.id),
                            deleteShopCategoryProduct(product.category, product.id),
                            // deleteProductsProduct(product.id, productsTable),
                          ]}
                        >
                          <BinIcon />
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default UploadProducts;
