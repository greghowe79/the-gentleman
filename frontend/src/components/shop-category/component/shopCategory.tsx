import { component$ } from '@builder.io/qwik';

interface ShopCategoryProps {
  categorySlug: string;
}

interface messageProps {
  message: string;
}

const ShopCategory = component$<ShopCategoryProps & messageProps>(({ categorySlug, message }) => {
  return (
    <div>
      <p style={{ color: 'red' }}>{categorySlug}</p>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
});

export default ShopCategory;
