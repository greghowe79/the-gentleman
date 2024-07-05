import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import {
  pdDesc,
  pdInnerWrap,
  pdMainWrap,
  pdName,
  /*  catDesc,
  titleWrapper,
  catDescWrapper, */
  detail,
  imgWrap,
  image,
  imgLink,
  contPad,
  imageStyle,
  priceStyle,
  priceWrapStyle,
  textDescription,
} from '../styles.css';
import { limitDescription } from '../actions/actions';

export const useCategory = routeLoader$(async (requestEvent) => {
  const res = await fetch(`http://localhost:3005/api_v1/shop/${requestEvent.params.category}`);
  const category = await res.json();
  return category;
});

interface Product {
  id: number;
  url: string;
  name: string;
  slug: string;
  price: number;
  created_at: string;
  description: string;
}

const ProductListPage = component$(() => {
  const category: any = useCategory();

  return (
    <>
      {category.value && category.value.length > 0 && (
        <>
          {category.value[0]?.products.map((product: Product) => {
            return (
              <div key={product.id} class={pdMainWrap}>
                <div class={pdInnerWrap}>
                  <Link href={'/shop/' + category.value[0]?.slug + '/' + product.slug} class={imgLink}>
                    <div class={imgWrap}>
                      <div class={contPad}>
                        <div class={image}>
                          {' '}
                          <Image
                            src={product.url}
                            layout="constrained"
                            decoding="async"
                            loading="lazy"
                            alt="A lovely bath"
                            class={imageStyle}
                          />
                        </div>
                      </div>
                    </div>
                    <div class={detail}>
                      <div class={pdName}>{product.name}</div>
                      <div class={pdDesc}>
                        <p class={textDescription}>{limitDescription(product.description)}</p>
                      </div>
                      <div class={priceWrapStyle}>
                        <strong class={priceStyle}>€ {product.price}</strong>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
});

export default ProductListPage;
