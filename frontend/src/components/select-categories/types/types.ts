import { type Signal } from '@builder.io/qwik';

interface CategoryOption {
  value: string;
  label: string;
}

export interface SelectProps {
  selectedOption: Signal<string>;
  categorySlug?: Signal<string>;
  options: CategoryOption[];
  exist: boolean;
  placeholder: string;
}
