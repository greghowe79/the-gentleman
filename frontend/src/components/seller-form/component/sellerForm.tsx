import { $, component$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { button, ctaWrap, prodNameInputWrap } from '~/routes/upload-products/style.css';
import styles from '../../../components/search-bar/styles/search-bar.module.css';
import zip_styles from '../../zipcode_input/styles/zipcode-input.module.css';
import { sellerForm, sellerFormWrap } from '~/routes/dashboard-seller/styles.css';
import { Form, useNavigate } from '@builder.io/qwik-city';
import { useGeoCode, useSellerEmail, useSellerInformation } from '~/routes/dashboard-seller/[sellerID]';
import ZipCodeInput from '~/components/zipcode_input/component/zipcode_input';
import { HasErrorContext, sellerFormContext } from '~/root';
import PhoneInput from '~/components/phone-input/component/phone-input';

const SellerForm = component$(() => {
  const sellerData = useSellerInformation();
  const geoCode = useGeoCode();
  const sellerEmail = useSellerEmail();
  const hasError = useContext(HasErrorContext);
  const inputLength = useSignal<number | undefined>(undefined);
  const rawValue = useSignal('');
  const nav = useNavigate();
  const sellerFormIsCompleted = useContext(sellerFormContext);
  const prefix = useSignal('');

  interface CountryCallingCodes {
    [key: string]: string;
  }
  const countryCallingCodes: CountryCallingCodes = {
    US: '1',
    CA: '1',
    GB: '44',
    IT: '39',
    // Aggiungi altri country code e prefissi telefonici qui
  };

  // const getPrefixFromCountryCode = $((countryCode: string) => {
  //   return countryCallingCodes[countryCode.toUpperCase()] ? `+${countryCallingCodes[countryCode.toUpperCase()]}` : null;
  // });
  const getPrefixFromCountryCode = $((countryCode: string): string => {
    const prefix = countryCallingCodes[countryCode.toUpperCase()];
    return prefix ? `+${prefix}` : '';
  });

  useTask$(async () => {
    prefix.value = await getPrefixFromCountryCode(geoCode.value.country_code);
  });

  console.log('PREFIX ', prefix.value);

  if (sellerData.value?.success) {
    sellerFormIsCompleted.value = true;
    nav('/dashboard-seller');
  }

  return (
    <div class={sellerFormWrap}>
      <Form class={[sellerForm, 'form']} action={sellerData} preventdefault:submit>
        <div class={prodNameInputWrap}>
          <label for="name" class={styles['label']}>
            <input type="text" id="name" name="name" placeholder="Full name" class={zip_styles['input']} required />
          </label>
        </div>
        {sellerData.value?.failed && <p>{sellerData.value.fieldErrors.name}</p>}
        <div class={prodNameInputWrap}>
          <label for="company" class={styles['label']}>
            <input type="text" id="company" name="company" placeholder="Company" class={zip_styles['input']} required />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="street" class={styles['label']}>
            <input type="text" id="street" name="street" placeholder="Street" class={zip_styles['input']} required />
          </label>
        </div>

        <div class={prodNameInputWrap}>
          <label for="city" class={styles['label']}>
            <input type="text" id="city" name="city" placeholder="City" class={zip_styles['input']} required />
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
        <div style={{ display: 'flex' }}>
          <div class={prodNameInputWrap} style={{ width: '16%' }}>
            <label for="prefix" class={styles['label']}>
              <input
                type="text"
                id="prefix"
                name="prefix"
                placeholder="Prefix"
                class={[zip_styles['input'], zip_styles['override']]}
                bind:value={prefix}
                readOnly
                required
                style={{ opacity: '0.6' }}
              />
            </label>
          </div>

          <div class={prodNameInputWrap} style={{ width: '84%' }}>
            <label for="phone" class={styles['label']}>
              <PhoneInput rawValue={rawValue} />
            </label>
          </div>
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
