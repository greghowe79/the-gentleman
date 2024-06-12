import { $, type Signal, component$, useContext, useSignal } from '@builder.io/qwik';
import styles from '../../zipcode_input/styles/zipcode-input.module.css';
import { HasPhoneErrorContext } from '~/root';
import { cleanPhoneInputValue, formatPhoneNumber } from '~/utils/seller_form_component_utils/utils';

export interface PhoneInputProps {
  rawValue: Signal<string>;
}

const PhoneInput = component$<PhoneInputProps>(({ rawValue }) => {
  const hasPhoneError = useContext(HasPhoneErrorContext);
  const hasPhoneSuccess = useSignal(false);
  const phoneNumber = useSignal('');
  const PHONE_NUMBER_LENGTH = 14;

  const handlePhoneInput = $(async (event: Event): Promise<void> => {
    const inputElement = event.target as HTMLInputElement;
    rawValue.value = await cleanPhoneInputValue(inputElement.value);
    if (rawValue.value.length > 10) {
      rawValue.value = rawValue.value.slice(0, 10);
    }
    const formattedValue = await formatPhoneNumber(rawValue.value);
    phoneNumber.value = formattedValue;
    inputElement.value = formattedValue;
  });

  return (
    <>
      <input
        required
        id="phone"
        name="phone"
        autoComplete="off"
        placeholder="(415) 229-5748"
        class={[styles['input'], hasPhoneError.value && styles['hasError'], hasPhoneSuccess.value && styles['hasSuccess']]}
        type="tel"
        maxLength={PHONE_NUMBER_LENGTH}
        value={phoneNumber.value}
        onInput$={(e) => handlePhoneInput(e)}
      />
    </>
  );
});

export default PhoneInput;
