import { component$ } from '@builder.io/qwik';
import styles from './hero.module.css';
import { Image } from '@unpic/qwik';
import { hero_image } from '~/routes/dashboard-seller/styles.css';

//import ImgThunder from '~/media/watch.png?jsx';

export default component$(() => {
  return (
    <div class={['container', styles.hero]}>
      <Image
        objectFit="cover"
        src={'https://oukztwgobbpvjuhlvpft.supabase.co/storage/v1/object/public/hero/hero.avif'}
        layout="constrained"
        decoding="async"
        loading="eager"
        alt={`Professione Corsa`}
        class={hero_image}
      />
      <div class={'home'}>
        <h3 id="resizing-h3" class="">
          <span>
            <div class="stage">
              <div class="cubespinner">
                <div class="face1">Joy</div>
                <div class="face2">Endurance</div>
                <div class="face3">Competition</div>
                <div class="face4">Passion</div>
              </div>
            </div>
          </span>
        </h3>
      </div>
      {/*  <ImgThunder class={styles['hero-image']} alt="principale" loading="eager" /> */}
    </div>
  );
});
