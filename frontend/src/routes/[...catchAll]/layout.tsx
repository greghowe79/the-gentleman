import { component$, useContext, useSignal } from '@builder.io/qwik';
import {
  linkStyle,
  pointStyle,
  shopArea,
  spanStyle,
  shopContainer,
  shopHeaderArea,
  shopHeaderContainer,
  shopBreadcrumb,
  detailImage,
  detailDescription,
  titlePrice,
  titleDetail,
  titleContainer,
  categoryWrapper,
  categoryStyle,
  shopWrapperDetailContent,
  thumbnailsWrapper,
  thumbnail,
  svgDivThumbnail,
  stickyImageContainer,
  leftWrapperDetail,
  priceDetail,
  spacer,
  quantityWrapper,
  label,
  cartButtonStyle,
  cartButtonWrapper,
  Wrap,
} from '../shop/styles.css';
import { Arrow } from '~/components/starter/icons/arrow';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { BodyContext, CartContext, UserSessionContext } from '~/root';
import { addToCart, calculateCategoryPath } from './utils';
import { Image } from '@unpic/qwik';
import ProductDetailImage from '~/components/product-detail-image/component/ProductDetailImage';
import CustomSelect from '~/components/select-categories/component/customSelect';
import { quantityOptions } from '~/components/select-categories/data/data';
import type { Service } from './types';

export const useService = routeLoader$(async (requestEvent) => {
  const res = await fetch(`http://localhost:3005/api_v1/${requestEvent.params.catchAll}`);
  const service: Service[] = await res.json();
  return service;
});

const ShopDetailLayout = component$(() => {
  const backgroundColor = useContext(BodyContext);
  const loc = useLocation();
  const service = useService();
  const categoryPath = calculateCategoryPath(loc.url.pathname);
  const selectedOption = useSignal('1');
  const userSession = useContext(UserSessionContext);
  const cart = useContext(CartContext);

  return (
    <div class={shopArea}>
      <div class={shopContainer}>
        <div class={shopHeaderArea}>
          <div class={shopHeaderContainer}>
            <div class={shopBreadcrumb}>
              <span class={spanStyle} style={{ padding: '0 30px' }}>
                <Arrow fill={backgroundColor.value} />
              </span>
              <span class={spanStyle}>
                <Link class={linkStyle} href="/">
                  <span>home</span>
                </Link>
                <strong class={pointStyle}>&nbsp; . &nbsp;</strong>
              </span>
              <span class={spanStyle}>
                <Link class={linkStyle} href="/shop">
                  <span>shop</span>
                </Link>

                {loc.params.catchAll && <strong class={pointStyle}>&nbsp; . &nbsp;</strong>}
              </span>

              {loc.params.catchAll && (
                <>
                  <span class={spanStyle}>
                    <Link class={linkStyle} href={categoryPath}>
                      <span style={{ color: 'var(--description-color)' }}>{loc.params.catchAll.split('/')[1].replace(/-/g, ' ')}</span>
                    </Link>
                    {loc.params.catchAll && <strong class={pointStyle}>&nbsp; . &nbsp;</strong>}
                  </span>

                  <span class={spanStyle}>
                    <span style={{ color: backgroundColor.value, cursor: 'default' }} class={linkStyle}>
                      {loc.params.catchAll.split('/')[2].replace(/-/g, ' ')}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div class={shopWrapperDetailContent}>
          <div class={stickyImageContainer}>
            <div class={Wrap}>
              <div class={thumbnailsWrapper}>
                <div class={thumbnail}>
                  <div class={svgDivThumbnail}>CIAO</div>
                </div>
                <div class={thumbnail}>
                  <div class={svgDivThumbnail}>CIAO</div>
                </div>
                <div class={thumbnail}>
                  <div class={svgDivThumbnail}>CIAO</div>
                </div>
              </div>
              <ProductDetailImage>
                <div q:slot="image" style={{ margin: '0 auto' }}>
                  <Image
                    objectFit="contain"
                    src={service.value[0]?.url}
                    layout="constrained"
                    decoding="async"
                    loading="lazy"
                    alt="A lovely bath"
                    class={detailImage}
                  />
                </div>
              </ProductDetailImage>
            </div>
          </div>

          <div class={leftWrapperDetail}>
            <div class={detailDescription}>
              <div class={titlePrice}>
                <h1 class={titleDetail}>
                  <div>
                    <div class={titleContainer}>{service.value[0]?.name}</div>
                  </div>
                  <div class={categoryWrapper}>
                    <strong class={categoryStyle}>{service.value[0]?.category}</strong>
                  </div>
                </h1>

                <div class={priceDetail}>EUR {service.value[0]?.price}</div>
              </div>
              <div class={spacer}>{service.value[0]?.description}</div>
              <div class={spacer}>
                <div class={quantityWrapper}>
                  <div class={label}>Choose the quantity</div>
                  <div>
                    <CustomSelect selectedOption={selectedOption} options={quantityOptions} exist={false} placeholder="" />
                  </div>
                </div>
                <div class={cartButtonWrapper}>
                  <button onClick$={() => addToCart(true, userSession, cart, null, selectedOption, service)} class={cartButtonStyle}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShopDetailLayout;
