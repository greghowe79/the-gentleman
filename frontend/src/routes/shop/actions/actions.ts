import { $ } from '@builder.io/qwik';

export const limitDescription = $((description: string) => {
  const words = description.split(' ');
  if (words.length > 100) {
    const limitedWords = words.slice(0, 20);
    const limitedDescription = limitedWords.join(' ') + '...';
    return limitedDescription;
  } else {
    return description;
  }
});
