import { component$, useContext, useSignal } from '@builder.io/qwik';
import { button, ctaWrap, prodNameInputWrap } from '~/routes/upload-products/style.css';
import styles from '../../../components/search-bar/styles/search-bar.module.css';
import zip_styles from '../../zipcode_input/styles/zipcode-input.module.css';
import { sellerForm, sellerFormWrap } from '~/routes/dashboard-seller/styles.css';
import { Form } from '@builder.io/qwik-city';
import { useGeoCode, useSellerEmail, useSellerInformation } from '~/routes/dashboard-seller/[sellerID]';
import ZipCodeInput from '~/components/zipcode_input/component/zipcode_input';
import { HasErrorContext } from '~/root';

const SellerForm = component$(() => {
  const sellerData = useSellerInformation();
  const geoCode = useGeoCode();
  const sellerEmail = useSellerEmail();
  const hasError = useContext(HasErrorContext);
  const inputLength = useSignal<number | undefined>(undefined);
  console.log(sellerEmail.value);
  console.log('geoCode', geoCode.value);

  return (
    <div class={sellerFormWrap}>
      <Form class={[sellerForm, 'form']} action={sellerData} preventdefault:submit>
        <div class={prodNameInputWrap}>
          <label for="name" class={styles['label']}>
            <input type="text" id="name" name="name" placeholder="Name" class={styles['seller_input']} required />
          </label>
        </div>
        {sellerData.value?.failed && <p>{sellerData.value.fieldErrors.name}</p>}

        <div class={prodNameInputWrap}>
          <label for="company" class={styles['label']}>
            <input type="text" id="company" name="company" placeholder="Company" class={styles['seller_input']} required />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="street1" class={styles['label']}>
            <input type="text" id="street1" name="street1" placeholder="Street1" class={styles['seller_input']} required />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="city" class={styles['label']}>
            <input type="text" id="city" name="city" placeholder="City" class={styles['seller_input']} required />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="state" class={styles['label']}>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              class={[zip_styles['input'], zip_styles['override']]}
              value={geoCode.value.region}
              readOnly
              required
              style={{ opacity: '0.6' }}
            />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="zip" class={styles['label']}>
            {/* <input type="text" id="zip" name="zip" placeholder="Zip" class={styles['seller_input']} required /> */}
            <ZipCodeInput inputLength={inputLength} />
          </label>
        </div>
        {hasError.value && (
          <span class={zip_styles['errorMessage']}>{`${
            inputLength.value === 0 ? 'Enter only a digit please' : 'ZIP Code must be 5 digits long'
          }`}</span>
        )}
        {sellerData.value?.failed && <p>{sellerData.value.fieldErrors.zip}</p>}
        <div class={prodNameInputWrap}>
          <label for="country" class={styles['label']}>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              class={[zip_styles['input'], zip_styles['override']]}
              required
              value={geoCode.value.country_code}
              readOnly
              style={{ opacity: '0.6' }}
            />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="phone" class={styles['label']}>
            <input type="tel" id="phone" name="phone" placeholder="Phone" class={styles['seller_input']} required />
          </label>
        </div>
        {sellerData.value?.failed && <p>{sellerData.value.fieldErrors.phone}</p>}
        <div class={prodNameInputWrap}>
          <label for="email" class={styles['label']}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              class={[zip_styles['input'], zip_styles['override']]}
              bind:value={sellerEmail}
              readOnly
              required
              style={{ opacity: '0.6' }}
            />
          </label>
        </div>
        {sellerData.value?.failed && <p>{sellerData.value.fieldErrors.email}</p>}
        <div class={ctaWrap}>
          <button class={button} type="submit" disabled={sellerData.isRunning}>
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
});

export default SellerForm;
