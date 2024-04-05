import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import IconPlus from '~/components/starter/icons/plus';
import { contentWrapper, labelWrapper } from '../styles/styles.css';

const ButtonAddProduct = component$(() => {
  return (
    <div>
      <Link href="/upload-products" class={contentWrapper}>
        <IconPlus tabIndex={0} />
        <div class={labelWrapper} tabIndex={0}>
          Add new product
        </div>
      </Link>
    </div>
  );
});

export default ButtonAddProduct;
