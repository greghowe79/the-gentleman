import { $, type Signal } from '@builder.io/qwik';

export const formatCategory = $((s: string, categorySlug: Signal<string>): string => {
  categorySlug.value = '';

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      if (i > 0 && s[i - 1] !== '-') {
        categorySlug.value += '-';
      }
    }
    // Convert the initial of the word to lowercase
    else if ((i === 0 || (i > 0 && s[i - 1] === ' ')) && s[i] !== '-') {
      categorySlug.value += s[i].toLowerCase();
    } else {
      categorySlug.value += s[i].toLowerCase();
    }
  }

  return categorySlug.value;
});

export const createSlug = $((s: string, productSlug: Signal<string>): string => {
  productSlug.value = '';

  s = s.trim().replace(/\s+/g, ' ');

  let isHyphenNeeded = false;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      isHyphenNeeded = true;
    } else if (/^[a-zA-Z0-9]$/.test(s[i])) {
      // Check if the character is alphanumeric
      if (isHyphenNeeded) {
        productSlug.value += '-';
        isHyphenNeeded = false;
      }
      productSlug.value += s[i].toLowerCase();
    }
  }

  productSlug.value = productSlug.value.replace(/^-+|-+$/g, '');

  return productSlug.value;
});

export const rotateArrow = $((open: Signal<boolean>, rotation: Signal<number>): void => {
  open.value = !open.value;
  rotation.value = open.value ? rotation.value + 180 : 0;
});
