import { type Signal } from '@builder.io/qwik';

interface CategoryOption {
  value: string;
  label: string;
}

export interface SelectProps {
  isFromEditPage?: boolean;
  selectedOption: Signal<string>;
  categorySlug?: Signal<string>;
  options: CategoryOption[];
  exist: boolean;
  placeholder: string;
}
