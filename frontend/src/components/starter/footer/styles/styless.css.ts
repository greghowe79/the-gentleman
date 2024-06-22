import { style } from '@vanilla-extract/css';

export const bgColor = style({
  background: 'linear-gradient(270deg, #4ca480, #407b56 50.65%, #376260)',
  color: '#fcfcfc',
});

export const flexParentWrap = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const flexContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: '1200px',
  padding: '64px 0 28px 0',
  letterSpacing: '0.75px',
  borderBottom: '1px solid #fcfcfc',
  rowGap: '30px',
});

export const section = style({
  width: '25%',
  fontFamily: 'var(--font-family-primary)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'column',
});

export const paragraph = style({
  fontSize: 'var(--font-size-sm)',
});

export const iconContainer = style({
  display: 'flex',
  gap: '1rem',
});

export const legalConainer = style({
  display: 'flex',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-sm)',
  gap: '1rem',
});

export const link = style({
  color: '#fcfcfc',
  opacity: '0.9',
  display: 'inline-flex',
  ':hover': {
    opacity: '1',
    textDecoration: 'underline',
  },
});

export const legalAreaWrap = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12.5px 0',
  width: '100%',
  maxWidth: '1200px',
});

export const socialButton = style({
  background: 'transparent',
  padding: '0',
});

export const socialIconWrap = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  background: 'transparent',
  ':hover': {
    background: 'rgba(0, 0, 0, 0.1)',
  },
});
