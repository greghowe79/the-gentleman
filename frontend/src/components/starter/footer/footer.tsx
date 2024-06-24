import { component$ } from '@builder.io/qwik';
//import { useServerTimeLoader } from '~/routes/layout';
//import styles from './footer.module.css';
import {
  bgColor,
  link,
  flexContainer,
  flexParentWrap,
  paragraph,
  section,
  legalAreaWrap,
  socialButton,
  socialIconWrap,
  iconContainer,
  legalConainer,
} from './styles/styless.css';
import { Link } from '@builder.io/qwik-city';
import FacebookIcon from '../icons/facebook';
import InstagramIcon from '../icons/instagram';
import LinkedinIcon from '../icons/linkedin';
import TwitterIcon from '../icons/twitter';
import YouTubeIcon from '../icons/youtube';
import { useServerTimeLoader } from '~/routes/layout';
//import { QwikLogo } from '../icons/qwik';

export default component$(() => {
  // const isDone = useSignal(true);

  /*  const setIsDone = $((newValue: boolean) => {
    isDone.value = newValue;
  }); */

  const serverTime = useServerTimeLoader();

  return (
    <footer class={bgColor}>
      {/* <button class="button-dark button-small" onClick$={() => setIsDone(!isDone.value)}>
        click me
      </button> 
      <div class={isDone.value ? 'container' : styles['red']}>
        <a href="https://www.builder.io/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by Builder.io</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}</span>
        </a>
      </div> */}
      {/*  <QwikLogo width={60} /> */}
      <div class={flexParentWrap}>
        <div class={flexContainer}>
          <div class={section}>
            <div>Address</div>
            <p class={paragraph}>
              Professione Corsa LLC
              <br />
              1234 Elm Street
              <br />
              Suite 567
              <br />
              Springfield, IL 62704
              <br />
              United States
              <br />
              EIN: 12-3456789
            </p>
          </div>
          <div class={section}>Buy on Professione Corsa</div>
          <div class={section}>
            Sell on Professione Corsa
            <p class={paragraph}>
              <Link href="#" class={link}>
                Sell as a merchant
              </Link>
            </p>
          </div>
          <div class={section}>
            Secure Purchase
            <p class={paragraph}>
              <Link href="#" class={link}>
                Payment
              </Link>
              <br />
              <Link href="#" class={link}>
                Shipping and delivery
              </Link>
              <br />
              <Link href="#" class={link}>
                Returns and refunds
              </Link>
            </p>
          </div>

          <div class={section}>
            Customer Service
            <p class={paragraph}>
              e:{' '}
              <a href="mailto:am.professionecorsa@gmail.com" class={link}>
                am.professionecorsa@gmail.com
              </a>
              <br />
              t:{' '}
              <a href="tel:00393714200848" class={link}>
                +39 371 420 0848
              </a>
              <br />
              <Link href="#" class={link}>
                FAQ
              </Link>
            </p>
          </div>
        </div>
        <div class={legalAreaWrap}>
          <div class={legalConainer}>
            <span>© {serverTime.value.year} Professione Corsa</span>

            <Link href="#" class={link}>
              Terms & Conditions
            </Link>
            <Link href="#" class={link}>
              Privacy Policy
            </Link>
            <Link href="#" class={link}>
              Cookie Policy
            </Link>
          </div>
          <div class={iconContainer}>
            <a href="https://www.facebook.com/professionecorsa/" class={link} target="_blank">
              <button class={socialButton} aria-label="Visit our Facebook page">
                <div class={socialIconWrap}>
                  <FacebookIcon />
                </div>
              </button>
            </a>
            <a href="#" class={link} target="_blank">
              <button class={socialButton} aria-label="Visit our Instagram page">
                <div class={socialIconWrap}>
                  <InstagramIcon />
                </div>
              </button>
            </a>
            <a href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/" class={link} target="_blank">
              <button class={socialButton} aria-label="Visit our Linkedin page">
                <div class={socialIconWrap}>
                  <LinkedinIcon />
                </div>
              </button>
            </a>
            <a href="https://x.com/alessandrovelma" class={link} target="_blank">
              <button class={socialButton} aria-label="Visit our Twitter page">
                <div class={socialIconWrap}>
                  <TwitterIcon />
                </div>
              </button>
            </a>
            <a href="https://www.youtube.com/channel/UCM8EVGwfrBV3IFMNHh7X9rg" class={link} target="_blank">
              <button class={socialButton} aria-label="Visit our YouTube page">
                <div class={socialIconWrap}>
                  <YouTubeIcon />
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});
