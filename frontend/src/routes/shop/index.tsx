import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import {
  catDesc,
  pdDesc,
  pdInnerWrap,
  pdMainWrap,
  pdName,
  titleWrapper,
  catDescWrapper,
  detail,
  imgWrap,
  image,
  imgLink,
  contPad,
  imageStyle,
  priceStyle,
  priceWrapStyle,
  addToCartButton,
  textDescription,
} from './styles.css';
import { Link } from '@builder.io/qwik-city';
import { limitDescription } from './actions/actions';
import { type Product } from './types/types';

const ShopProducts = component$(({ data }: any) => {
  return (
    <>
      {data && data.length > 0 && (
        <>
          <div class={catDescWrapper}>
            <h1 class={titleWrapper}>{data[0]?.category_title}</h1>
            <p class={catDesc}>{data[0]?.category_description}</p>
          </div>
          {data[0]?.products.map((product: Product) => {
            return (
              <div key={product.id} class={pdMainWrap}>
                <div class={pdInnerWrap}>
                  <Link href={'/shop/' + product.categorySlug + '/' + product.slug} class={imgLink}>
                    <div class={imgWrap}>
                      <div class={contPad}>
                        <div class={image}>
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
                      <div class={pdDesc}> - {product.category} - </div>
                      <div class={pdDesc}>
                        <p class={textDescription}>{limitDescription(product.description)}</p>
                      </div>
                      <div class={priceWrapStyle}>
                        <strong class={priceStyle}>EUR {product.price}</strong>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick$={() =>
                      // addToCart({
                      //   isFromPdp: true,
                      //   userSession,
                      //   cart,
                      //   product: null,
                      //   selectedOption,
                      //   service,
                      // })
                      console.log('ECCO')
                    }
                    class={addToCartButton}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
});

export default ShopProducts;

export const head: DocumentHead = {
  title: 'The Gentleman Services: Discover Luxury Experiences',
  meta: [
    {
      name: 'description',
      content:
        'Explore The Gentleman Services for a curated collection of luxury experiences. From tailored fashion to exclusive travel, VIP entertainment, personalized financial services, and luxury properties. Elevate your lifestyle with The Gentleman.',
    },
  ],
};
