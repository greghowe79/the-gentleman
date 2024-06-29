import imageUrl from '~/media/professione_corsa_last.png';
export const QwikLogo = ({ width = 100, height = 100 }: { width?: number; height?: number }) => (
  <img src={imageUrl} width={width} height={height} alt="Professione Corsa Logo" />
);
