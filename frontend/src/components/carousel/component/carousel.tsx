import { component$, $, useContext } from '@builder.io/qwik';
import { detailImage } from '~/routes/shop/styles.css';
import { Image } from '@unpic/qwik';
import { carousel, carouselControl, carouselControlNext, carouselControlPrev, carouselInner, carouselItem } from '../style/style.css';
import RightArrow from '~/components/starter/icons/carousel_right_icon';
import LeftArrow from '~/components/starter/icons/carousel_left_icon';
import { CarouselIndexContext } from '~/root';

type CarouselProps = {
  images: string[];
};

export const Carousel = component$<CarouselProps>(({ images }) => {
  const carouselIndex = useContext(CarouselIndexContext);

  const nextSlide = $(() => {
    carouselIndex.value = (carouselIndex.value + 1) % images.length;
  });

  const prevSlide = $(() => {
    carouselIndex.value = (carouselIndex.value - 1 + images.length) % images.length;
  });

  return (
    <div class={carousel}>
      <button onClick$={prevSlide} class={`${carouselControl} ${carouselControlPrev}`}>
        <LeftArrow />
      </button>
      <div class={carouselInner} style={{ transform: `translateX(-${carouselIndex.value * 100}%)` }}>
        {images.map((image, index) => (
          <div class={`${carouselItem} ${index === carouselIndex.value ? 'active' : ''}`} key={index}>
            <Image
              objectFit="cover"
              src={image}
              layout="constrained"
              decoding="async"
              loading="lazy"
              alt={`Slide ${index + 1}`}
              class={detailImage}
            />
          </div>
        ))}
      </div>
      <button onClick$={nextSlide} class={`${carouselControl} ${carouselControlNext}`}>
        <RightArrow />
      </button>
    </div>
  );
});
