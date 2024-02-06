import { style } from '@vanilla-extract/css';

export const controlsContainer = style({
  display: 'inline-flex',
  margin: '0 -10px',
  cursor: 'default',
  textAlign: 'center',
  alignItems: 'center',
});

export const flexWrap = style({
  display: 'flex',
  alignItems: 'center',
  flex: '1',
  justifyContent: 'space-between',
});

export const spacer = style({
  paddingLeft: '18px',
});

export const spacerFirstChild = style({
  textAlign: 'right',
});

export const controlsStyle = style({
  position: 'relative',
  padding: ' 0 10px',
  background: 'none',
  border: 'none',
  color: 'var(--default-text-color)',
  fontFamily: 'var(--font-family-primary)',
  fontSize: 'var(--font-size-lg)',
  lineHeight: 'var(--line-height-md)',
  fontWeight: 'normal',
  letterSpacing: '-0.15px',
});

export const price = style({
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-md)',
});

export const itemsNumber = style({
  fontFamily: 'var(--font-family-secondary)',
});

export const imgWrap = style({
  marginRight: '12px',
  flexShrink: '0',
  width: '60px',
  display: 'flex',
  alignItems: 'center',
});
export const nameStyle = style({
  fontFamily: 'var(--font-family-secondary)',
});

export const linkStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const productsContainer = style({
  padding: '30px 30px 60px 30px',
});

export const wrap = style({
  flex: '1',
  overflowY: 'auto',
});

export const wrapFirstChild = style({ transform: 'translate3d(0px, 0px, 0px)' });
