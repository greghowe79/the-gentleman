import { component$ } from '@builder.io/qwik';
import type { ModalTextProps } from '../types/types';

const ModalText = component$<ModalTextProps>((productName) => {
  return <>{`Delete product? The '${productName.productName}' associated data with this product will also be deleted.`}</>;
});

export default ModalText;
