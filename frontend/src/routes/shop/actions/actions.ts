import { $ } from '@builder.io/qwik';

export const limitDescription = $((description: string): string => {
  if (description.length <= 100) {
    return description;
  } else {
    let truncated = description.substring(0, 80).trim();
    truncated += ' ...';
    return truncated;
  }
});
