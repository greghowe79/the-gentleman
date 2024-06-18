import { style } from '@vanilla-extract/css';

export const bgColor = style({
  background: 'linear-gradient(270deg, #4ca480, #407b56 50.65%, #376260)',
  color: '#fcfcfc',
});

export const flexParentWrap = style({
  display: 'flex',
  justifyContent: 'center',
});

export const flexContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: '1200px',
  padding: '64px 0 28px 0',
  letterSpacing: '0.75px',
});

export const section = style({
  width: '17.5%',
  fontFamily: 'var(--font-family-primary)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'column',
});

export const paragraph = style({
  fontSize: 'var(--font-size-sm)',
});

export const link = style({
  color: '#fcfcfc',
  opacity: '0.9',
  ':hover': {
    opacity: '1',
    textDecoration: 'underline',
  },
});
