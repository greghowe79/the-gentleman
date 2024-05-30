import { component$, useSignal, $ } from '@builder.io/qwik';
import { detailImage } from '~/routes/shop/styles.css';
import { Image } from '@unpic/qwik';
import { carousel, carouselControl, carouselControlNext, carouselControlPrev, carouselInner, carouselItem } from '../style/style.css';

type CarouselProps = {
  images: string[];
};

export const Carousel = component$<CarouselProps>(({ images }) => {
  const currentIndex = useSignal(0);

  const nextSlide = $(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  });

  const prevSlide = $(() => {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
  });

  return (
    <div class={carousel}>
      <button onClick$={prevSlide} class={`${carouselControl} ${carouselControlPrev}`}>
        &lt;
      </button>
      <div class={carouselInner} style={{ transform: `translateX(-${currentIndex.value * 100}%)` }}>
        {images.map((image, index) => (
          <div class={`${carouselItem} ${index === currentIndex.value ? 'active' : ''}`} key={index}>
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
        &gt;
      </button>
    </div>
  );
});
