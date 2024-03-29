import { style } from '@vanilla-extract/css';

export const container = style({
  background: '#fcfcfc',
  height: 'calc(100vh - var(--header-height))',
});
export const notConnWrap = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: 'calc(100vh - var(--header-height))',
  gap: '20px',
});

export const title_h3 = style({
  color: 'black',
  margin: '0',
});
