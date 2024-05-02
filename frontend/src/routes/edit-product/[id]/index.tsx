import { type Signal, component$, useContext, useSignal, $ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import CustomSelect from '~/components/select-categories/component/customSelect';
import { categoryOptions } from '~/components/select-categories/data/data';
import { ImageIndexContext, ImagesContext, UserSessionContext } from '~/root';
import {
  button,
  containerBlock,
  ctaWrap,
  flexWrapper,
  form,
  input,
  label,
  labelWrapper,
  prevWrap,
  preview,
  previewContainer,
  prodDescrTextWrap,
  prodNameInputWrap,
  slidingContainer,
  textAreaStyle,
  editDetail,
  imageContainer,
  imgStyle,
  editContainer,
  editDesc,
  editFormContainer,
} from '~/routes/upload-products/style.css';
import { handleChange, handlePriceKeyPress, handleTextAreaChange, uploadImage } from '~/utils/helpers';
import { supabase } from '~/utils/supabase';
import { Image } from '@unpic/qwik';
import styles from '../../../components/search-bar/styles/search-bar.module.css';
import { pdDesc, pdName, priceStyle } from '~/routes/shop/styles.css';
import { limitDescription } from '~/routes/shop/actions/actions';
import {
  checkImageHasBeenChanged,
  replaceImageInBucket,
  updateProductTable,
  updateShopCategoryTable,
} from '~/utils/edit_page_utils/edit_actions';
import type { ImageBucketReplacementProps, ImageChangeCheckerProps, ProductTableUpdateProps } from '~/utils/edit_page_utils/types';

export const useProductDetails = routeLoader$(async (requestEvent) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', requestEvent.params.id);
  if (error) {
    console.error(error);
  }

  return {
    productDetail: data as any,
  };
});

const EditPage = component$(() => {
  const product = useProductDetails();
  const selectedOption = useSignal(product.value.productDetail[0]?.category);
  const currentFile: Signal<any> = useSignal();
  const selectedFile = useSignal<string>(product.value.productDetail[0]?.file_name);
  const productName = useSignal<string>(product.value.productDetail[0]?.name);
  const productSlug = useSignal<string>(product.value.productDetail[0]?.slug);
  const productPrice = useSignal<string>(product.value.productDetail[0]?.price);
  const productDescription = useSignal<string>(product.value.productDetail[0]?.description);
  const categorySlug = useSignal<string>(product.value.productDetail[0]?.category_slug);
  const imageUrl = useSignal<string>(product.value.productDetail[0]?.url);
  const userSession = useContext(UserSessionContext);
  const images = useContext(ImagesContext);
  const imageIndex = useContext(ImageIndexContext);
  const imageHasBeenChanged = useSignal(false);

  const imageChangeCheckerArgs: ImageChangeCheckerProps = {
    selectedFile,
    receivedFileName: product.value.productDetail[0]?.file_name,
  };

  const ImageBucketReplacementArgs: ImageBucketReplacementProps = {
    userSession,
    imageName: images.value?.[imageIndex.value]?.name,
    currentFile,
  };

  const productTableUpdateArgs: ProductTableUpdateProps = {
    id: product.value.productDetail[0]?.id,
    selectedFile,
    productName,
    productPrice,
    productDescription,
    productSlug,
  };

  const handleSubmit = $(async () => {
    imageHasBeenChanged.value = await checkImageHasBeenChanged(imageChangeCheckerArgs);
    imageHasBeenChanged.value
      ? (await replaceImageInBucket(ImageBucketReplacementArgs), (imageChangeCheckerArgs.receivedFileName = selectedFile.value))
      : null;
    updateProductTable(productTableUpdateArgs);
    updateShopCategoryTable(categorySlug, userSession, product.value.productDetail[0]?.id);
  });

  return (
    <>
      {userSession.isLoggedIn && (
        <div class={editFormContainer}>
          <div class={containerBlock}>
            <form class={[form, 'form']} onSubmit$={handleSubmit} preventdefault:submit>
              <CustomSelect
                isFromEditPage={true}
                selectedOption={selectedOption}
                categorySlug={categorySlug}
                options={categoryOptions}
                exist={true}
                placeholder={'Please choose a category'}
              />
              <div class={prodNameInputWrap}>
                <div class={flexWrapper}>
                  <div class={labelWrapper}>
                    <label for="edit_image_downloads" class={label}>
                      <div>Upload</div>
                    </label>
                    <input
                      class={input}
                      type="file"
                      id="edit_image_downloads"
                      name="edit_image_downloads"
                      accept=".png, .jpg, .jpeg, .avif"
                      onChange$={(e) => uploadImage(e, currentFile, selectedFile, imageUrl)}
                      required={selectedFile.value !== product.value.productDetail[0]?.file_name}
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
                    value={productName.value}
                    type="text"
                    id="product"
                    name="product"
                    placeholder="Product name"
                    class={styles['input']}
                    required
                    onChange$={(e) => handleChange(e, productName)}
                  />
                </label>
              </div>

              <div class={prodNameInputWrap}>
                <label for="slug" class={styles['label']}>
                  <input
                    value={productSlug.value}
                    type="text"
                    id="slug"
                    name="slug"
                    placeholder="Slug"
                    class={styles['input']}
                    required
                    onChange$={(e) => handleChange(e, productSlug)}
                  />
                </label>
              </div>

              <div class={prodNameInputWrap}>
                <label for="price" class={styles['label']}>
                  <input
                    value={productPrice.value}
                    min={0}
                    onKeyPress$={(e) => handlePriceKeyPress(e)}
                    step="any"
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    class={styles['input']}
                    required
                    onChange$={(e) => handleChange(e, productPrice)}
                  />
                </label>
              </div>
              <div class={prodDescrTextWrap}>
                <label for="prodDescription" style={{ display: 'none' }}></label>

                <textarea
                  value={productDescription.value}
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
                <button class={button} type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          <div class={[slidingContainer, editContainer, 'sliding-container']}>
            <div>
              <div>
                <div>
                  <div class={imageContainer}>
                    <Image src={imageUrl.value} layout="constrained" decoding="async" loading="lazy" alt="A lovely bath" class={imgStyle} />
                  </div>
                </div>
              </div>
              <div class={editDetail}>
                <div class={pdName}>{productName.value}</div>
                <div class={pdDesc}> - {categorySlug.value} - </div>
                <div class={editDesc}>
                  <p>{limitDescription(productDescription.value)}</p>
                </div>
                <div>
                  <strong class={priceStyle}>EUR {productPrice.value}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default EditPage;
