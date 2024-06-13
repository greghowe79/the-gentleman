import { $ } from '@builder.io/qwik';
import type { ZipCodeProps } from './types';
import { countryCallingCodes } from '~/components/seller-form/data/data';

const cleanInputValue = $((value: string): string => {
  return value.replace(/[^0-9]/g, '');
});

const cleanPhoneInputValue = $((value: string): string => {
  return value.replace(/\D/g, '');
});

const formatPhoneNumber = $((number: string) => {
  const cleaned = number.replace(/\D/g, '');
  let formatted = '';

  if (cleaned.length > 0) {
    formatted += '(' + cleaned.substring(0, 3);
  }
  if (cleaned.length >= 4) {
    formatted += ') ' + cleaned.substring(3, 6);
  }
  if (cleaned.length >= 7) {
    formatted += '-' + cleaned.substring(6, 10);
  }

  return formatted;
});

const updateInputState = $((zipCodeParams: ZipCodeProps): void => {
  const { cleanedValue, inputLength, hasError, hasSuccess, ZIP_CODE_LENGTH } = zipCodeParams;
  inputLength.value = cleanedValue.length;
  hasError.value = cleanedValue.length === 0 || cleanedValue.length < ZIP_CODE_LENGTH;
  hasSuccess.value = cleanedValue.length === ZIP_CODE_LENGTH;
});

const getPrefixFromCountryCode = $((countryCode: string): string => {
  const prefix = countryCallingCodes[countryCode.toUpperCase()];
  return prefix ? `+${prefix}` : '';
});

export { cleanInputValue, updateInputState, formatPhoneNumber, cleanPhoneInputValue, getPrefixFromCountryCode };
