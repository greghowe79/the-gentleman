import { style } from '@vanilla-extract/css';
export const currencyContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: '20px',
});

export const balanceStyle = style({
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
  fontFamily: 'var(--default-text-color)',
  fontSize: 'var(--font-size-xxl2)',
  fontWeight: '400',
  width: '40%',
});
export const spanLabel = style({
  fontSize: 'var(--font-size-md)',
});
