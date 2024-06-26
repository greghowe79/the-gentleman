import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import {
  descriptionWrapper,
  imageWrapper,
  innerWrapper,
  itemsContainer,
  paragraphStyle,
  sectionWrap,
  shopCategoryButton,
  titleWrap,
} from './styles/styles.css';
import { Link } from '@builder.io/qwik-city';
import type { Category, ShopCategoriesProps } from '~/utils/homepage/types/types';

const Presentation = component$<ShopCategoriesProps>(({ shopCategories }) => {
  return (
    <>
      {shopCategories.map((category: Category, index: number) => (
        <div class={sectionWrap} key={category.id}>
          <div class={itemsContainer}>
            {index % 2 === 0 ? (
              <>
                <div class={imageWrapper}>
                  <Image objectFit="contain" src={category.image_url} layout="constrained" decoding="async" loading="lazy" alt={'image'} />
                </div>
                <div class={descriptionWrapper}>
                  <div class={innerWrapper}>
                    <h2 class={titleWrap}>{category.category_title}</h2>
                    <p class={paragraphStyle}>{category.category_description}</p>

                    <Link href={`/shop/${category.slug}`}>
                      <button class={shopCategoryButton}>{`Shop ${category.category_title}`}</button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class={descriptionWrapper}>
                  <div class={innerWrapper}>
                    <h2 class={titleWrap}>{category.category_title}</h2>
                    <p class={paragraphStyle}>{category.category_description}</p>

                    <Link href={`/shop/${category.slug}`}>
                      <button class={shopCategoryButton}>{`Shop ${category.category_title}`}</button>
                    </Link>
                  </div>
                </div>
                <div class={imageWrapper}>
                  <Image objectFit="contain" src={category.image_url} layout="constrained" decoding="async" loading="lazy" alt={'image'} />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
});

export default Presentation;
