import { $, type Signal } from '@builder.io/qwik';

export const formatCategory = $((s: string, categorySlug: Signal<string>): string => {
  categorySlug.value = '';

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      // Add a hyphen only if there isn't already one
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

export const rotateArrow = $((open: Signal<boolean>, rotation: Signal<number>): void => {
  open.value = !open.value;
  rotation.value = open.value ? rotation.value + 180 : 0;
});
