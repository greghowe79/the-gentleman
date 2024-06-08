import { $ } from '@builder.io/qwik';
import type { ZipCodeProps } from './types';

const cleanInputValue = $((value: string): string => {
  return value.replace(/[^0-9]/g, '');
});

const updateInputState = $((zipCodeParams: ZipCodeProps): void => {
  const { cleanedValue, inputLength, hasError, hasSuccess, ZIP_CODE_LENGTH } = zipCodeParams;
  inputLength.value = cleanedValue.length;
  hasError.value = cleanedValue.length === 0 || cleanedValue.length < ZIP_CODE_LENGTH;
  hasSuccess.value = cleanedValue.length === ZIP_CODE_LENGTH;
});

export { cleanInputValue, updateInputState };
