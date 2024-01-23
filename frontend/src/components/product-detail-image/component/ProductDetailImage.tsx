import { Slot, component$ } from '@builder.io/qwik';

const ProductDetailImage = component$(() => {
  return (
    <>
      <Slot name="image" />
    </>
  );
});

export default ProductDetailImage;
