import type { Signal } from '@builder.io/qwik';

export interface ZipCodeProps {
  cleanedValue: string;
  inputLength: Signal<number | undefined>;
  hasError: Signal<boolean>;
  hasSuccess: Signal<boolean>;
  ZIP_CODE_LENGTH: number;
}
