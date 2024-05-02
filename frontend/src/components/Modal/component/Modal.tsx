import { component$, useContext, useSignal } from '@builder.io/qwik';
import { buttonsWrapper, modalOverlay, modalText, modalWrapper, cancelButtonStyle, deleteButtonStyle } from '../styles/styles.css';
import { ImageIndexContext, ImagesContext, ModalContext, ProductsSellerContext, ProductsTableContext, UserSessionContext } from '~/root';
import { cancelButtonText, deleteButtonText } from '../data/data';
import ModalText from '~/components/modal-text/component/ModalText';
import { deleteImage, deleteProductsProduct, deleteShopCategoryProduct, deleteShopProduct } from '~/utils/helpers';

const Modal = component$(() => {
  const isModalVisible = useContext(ModalContext);
  const userSession = useContext(UserSessionContext);
  const images = useContext(ImagesContext);
  const imageIndex = useContext(ImageIndexContext);
  const productsTable = useContext(ProductsTableContext);
  const products = useContext(ProductsSellerContext);
  const isLoading = useSignal(false);
  const { id, category } = products.value[imageIndex.value];

  return (
    <div class={modalOverlay} onClick$={() => (isModalVisible.value = false)}>
      <div class={modalWrapper}>
        <div class={modalText}>
          <ModalText productName={products.value[imageIndex.value]?.name} />
        </div>
        <div class={buttonsWrapper}>
          <button class={cancelButtonStyle} onclick$={() => (isModalVisible.value = false)}>
            {cancelButtonText}
          </button>
          <button
            class={deleteButtonStyle}
            onclick$={(e) => [
              e.stopPropagation(),
              deleteImage(userSession, images.value?.[imageIndex.value]?.name, images),
              deleteShopProduct(1, id),
              deleteShopCategoryProduct(category, id),
              deleteProductsProduct(id, productsTable, userSession, products, isLoading, isModalVisible),
              console.log('IMAGE VALUE', images.value),
              console.log('images value.[imageIndex.value', images.value?.[imageIndex.value]),
              console.log('IMAGE NAME', images.value?.[imageIndex.value]?.name),
            ]}
          >
            {isLoading.value ? 'Deleting ...' : deleteButtonText}
          </button>
        </div>
      </div>
    </div>
  );
});
export default Modal;
