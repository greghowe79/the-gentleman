import { $, type Signal } from '@builder.io/qwik';

export const getImageName = $((imageUrl: string, imageName: Signal<string>) => {
  const url = imageUrl.split('/').pop();
  if (url) {
    imageName.value = url;
    return imageName.value;
  }
});
