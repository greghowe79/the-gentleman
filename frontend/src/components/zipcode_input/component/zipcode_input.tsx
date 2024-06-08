import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import styles from '../styles/zipcode-input.module.css';
import { HasErrorContext } from '~/root';
import { cleanInputValue, updateInputState } from '~/utils/seller_form_component_utils/utils';
import type { ZipCodeProps } from '~/utils/seller_form_component_utils/types';
import type { ZipInputProps } from '../types';

const ZipCodeInput = component$<ZipInputProps>(({ inputLength }) => {
  const hasError = useContext(HasErrorContext);
  const hasSuccess = useSignal(false);
  const ZIP_CODE_LENGTH = 5;

  const handleInput = $(async (event: Event): Promise<void> => {
    const inputElement = event.target as HTMLInputElement;
    const cleanedValue = await cleanInputValue(inputElement.value);
    inputElement.value = cleanedValue;

    const zipCodeArgs: ZipCodeProps = {
      cleanedValue,
      inputLength,
      hasError,
      hasSuccess,
      ZIP_CODE_LENGTH,
    };
    await updateInputState(zipCodeArgs);
  });

  return (
    <>
      <input
        required
        id="zip"
        name="zip"
        autoComplete="off"
        placeholder="ENTER YOUR ZIP"
        class={[styles['input'], hasError.value && styles['hasError'], hasSuccess.value && styles['hasSuccess']]}
        type="text"
        maxLength={ZIP_CODE_LENGTH}
        onInput$={(e) => handleInput(e)}
      />
    </>
  );
});

export default ZipCodeInput;
