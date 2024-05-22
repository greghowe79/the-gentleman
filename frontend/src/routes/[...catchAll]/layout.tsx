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
  //detailImage,
  detailDescription,
  titlePrice,
  titleDetail,
  titleContainer,
  categoryWrapper,
  categoryStyle,
  shopWrapperDetailContent,
  // thumbnailsWrapper,
  // thumbnail,
  // svgDivThumbnail,
  stickyImageContainer,
  leftWrapperDetail,
  priceDetail,
  spacer,
  quantityWrapper,
  label,
  cartButtonStyle,
  cartButtonWrapper,
  Wrap,
  spacerFirst,
  buyItNowButtonStyle,
  butItNowButtonWrapper,
} from '../shop/styles.css';
import { Arrow } from '~/components/starter/icons/arrow';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { BodyContext, CartContext, IconKeyContext, OpenPanelContext, UserSessionContext } from '~/root';
//import { Image } from '@unpic/qwik';
import ProductDetailImage from '~/components/product-detail-image/component/ProductDetailImage';
import CustomSelect from '~/components/select-categories/component/customSelect';
import { quantityOptions } from '~/components/select-categories/data/data';
import type { Service } from '~/utils/product_detail_page_utils/types';
import { addToCart } from '~/utils/product_detail_page_utils/actions_product_detail_page';
import { calculateCategoryPath } from '~/utils/product_detail_page_utils/pdp_utils';
import { Carousel } from '~/components/carousel/component/carousel';

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
  const openPanel = useContext(OpenPanelContext);
  const iconKey = useContext(IconKeyContext);

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
                      <span style={{ color: 'var(--default-text-color)' }}>{loc.params.catchAll.split('/')[1].replace(/-/g, ' ')}</span>
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
              {/* <div class={thumbnailsWrapper}>
                <div class={thumbnail}>
                  <div class={svgDivThumbnail}>CIAO</div>
                </div>
                <div class={thumbnail}>
                  <div class={svgDivThumbnail}>CIAO</div>
                </div>
                <div class={thumbnail}>
                  <div class={svgDivThumbnail}>CIAO</div>
                </div>
              </div> */}
              <ProductDetailImage>
                <div q:slot="image" style={{ margin: '0 auto' }}>
                  {/* <Image
                    objectFit="contain"
                    src={service.value[0]?.url}
                    layout="constrained"
                    decoding="async"
                    loading="lazy"
                    alt="A lovely bath"
                    class={detailImage}
                  /> */}
                  <Carousel images={service.value[0]?.images_url} />
                </div>
              </ProductDetailImage>
            </div>
          </div>

          <div class={leftWrapperDetail}>
            <div class={detailDescription}>
              <div class={titlePrice}>
                <div class={titleDetail}>
                  <div>
                    <h1 class={titleContainer}>{service.value[0]?.name}</h1>
                  </div>
                  <div class={categoryWrapper}>
                    <strong class={categoryStyle}>{service.value[0]?.category}</strong>
                  </div>
                </div>
              </div>
              <div class={priceDetail}>{service.value[0]?.price} €</div>
              <div class={spacerFirst}>
                <div class={quantityWrapper}>
                  <div class={label}>Choose the quantity</div>
                  <div>
                    <CustomSelect selectedOption={selectedOption} options={quantityOptions} exist={false} placeholder="" />
                  </div>
                </div>
                <div class={cartButtonWrapper}>
                  <button
                    onClick$={() => [
                      addToCart({
                        isFromPdp: true,
                        userSession,
                        cart,
                        product: null,
                        selectedOption,
                        service,
                      }),
                      (iconKey.number = '0'),
                      (openPanel.isOpen = true),
                    ]}
                    class={cartButtonStyle}
                  >
                    Add to Cart
                  </button>
                </div>
                <div class={butItNowButtonWrapper}>
                  <button onClick$={() => console.log('CHECKOUT')} class={buyItNowButtonStyle}>
                    Buy it now
                  </button>
                </div>
              </div>
              <div class={spacer}>{service.value[0]?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ShopDetailLayout;
