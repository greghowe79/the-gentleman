import { component$, useContext } from '@builder.io/qwik';
import { imgWrap } from '~/components/shopping-bag/styles/style.css';
import { Image } from '@unpic/qwik';
import type { SellerProductsProps } from '../types/types';
import { buttonIcon } from '~/routes/upload-products/style.css';
import BinIcon from '~/components/starter/icons/bin';
import { ModalContext, ImageNameContext, ImageIndexContext } from '~/root';
import EditIcon from '~/components/starter/icons/edit';
import { Link } from '@builder.io/qwik-city';
import { getImageName } from '~/utils/seller_products_components_utils/seller_products';

const SellerProducts = component$<SellerProductsProps>(({ products, columns, hasBeenFetch }) => {
  const isModalVisible = useContext(ModalContext);
  const imageIndex = useContext(ImageIndexContext);
  const imageName = useContext(ImageNameContext);

  console.log('Products ', products.value);

  return (
    <>
      {hasBeenFetch?.value && (
        <div class="Table">
          <div class="Table-header">
            {columns.map((column) => (
              <div key={column.id} class="Table-row-item">
                {column.label}
              </div>
            ))}
          </div>
          <div class="row-collection">
            {products.value.map((product, index) => (
              <div key={product.id} class="tableRowWrap">
                <div class="Table-row">
                  <div class="Table-row-item" data-header="Image">
                    <div class={imgWrap}>
                      <Image src={product.url} layout="constrained" decoding="async" loading="lazy" alt="A lovely bath" />
                    </div>
                  </div>
                  <div class="Table-row-item" data-header="Name">
                    {product.name}
                  </div>
                  <div class="Table-row-item" data-header="SKU">
                    {product.sku}
                  </div>
                  <div class="Table-row-item" data-header="Price">
                    {product.price}
                  </div>
                  <div class="Table-row-item" data-header="Category">
                    {product.category}
                  </div>
                  <div class="Table-row-item" data-header="Actions">
                    <button
                      class={buttonIcon}
                      onClick$={() => [(isModalVisible.value = true), getImageName(product.url, imageName), (imageIndex.value = index)]}
                    >
                      <BinIcon />
                    </button>

                    <Link
                      class={buttonIcon}
                      href={`/edit-product/${product.id}`}
                      onClick$={() => [getImageName(product.url, imageName), (imageIndex.value = index)]}
                    >
                      <EditIcon />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
});

export default SellerProducts;
