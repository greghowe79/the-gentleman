import { component$, useContext } from '@builder.io/qwik';
import { buttonsWrapper, modalOverlay, modalText, modalWrapper, cancelButtonStyle, deleteButtonStyle } from '../styles/styles.css';
import { ModalContext, ProductNameContext } from '~/root';
import { cancelButtonText, deleteButtonText } from '../data/data';
import ModalText from '~/components/modal-text/component/ModalText';
//import { deleteImage, deleteProductsProduct, deleteShopCategoryProduct, deleteShopProduct } from '~/utils/helpers';

const Modal = component$(() => {
  const isModalVisible = useContext(ModalContext);
  const productName = useContext(ProductNameContext);
  //const userSession = useContext(UserSessionContext);

  return (
    <div class={modalOverlay} onClick$={() => (isModalVisible.value = false)}>
      <div class={modalWrapper}>
        <div class={modalText}>
          <ModalText productName={productName} />
        </div>
        <div class={buttonsWrapper}>
          <button class={cancelButtonStyle} onclick$={() => (isModalVisible.value = false)}>
            {cancelButtonText}
          </button>
          <button
            class={deleteButtonStyle}
            onclick$={(e) => [
              e.stopPropagation(),
              // deleteImage(userSession, images.value[index]?.name, images),
              // deleteShopProduct(1, product.id),
              // deleteShopCategoryProduct(product.category, product.id),
              // deleteProductsProduct(product.id, productsTable),
            ]}
          >
            {deleteButtonText}
          </button>
        </div>
      </div>
    </div>
  );
});
export default Modal;
