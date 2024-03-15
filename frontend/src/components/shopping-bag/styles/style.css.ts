import { style } from '@vanilla-extract/css';

export const controlsContainer = style({
  display: 'inline-flex',
  cursor: ' default',
  alignItems: 'center',
  borderRadius: '30px',
  border: '1px solid var(--default-text-color)',
  width: '140px',
  height: '45px',
  justifyContent: 'center',
  marginTop: '20px',
});

export const flexWrap = style({
  display: 'flex',
  alignItems: 'flex-start',
  flex: '1',
  justifyContent: 'space-between',
  paddingTop: '20px',
});

export const spacer = style({
  paddingLeft: '18px',
});

export const spacerFirstChild = style({
  textAlign: 'right',
  width: '70px',
  lineHeight: '1',
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
  letterSpacing: '.1rem',
});

export const itemsNumber = style({
  fontFamily: 'var(--font-family-secondary)',
  padding: '0 30px',
});

export const imgWrap = style({
  flexShrink: '0',
  width: '60px',
  display: 'flex',
  alignSelf: 'center',
});
export const nameStyle = style({
  fontFamily: 'var(--font-family-secondary)',
});

export const linkStyle = style({
  display: 'flex',
  flexDirection: 'row',
  height: '150px',
  justifyContent: 'center',
});

export const productsContainer = style({
  padding: '30px 30px 60px 30px',
});

export const wrap = style({
  flex: '1',
  overflowY: 'auto',
});

export const innerDiv = style({
  paddingLeft: '60px',
});

export const priceSmall = style({
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-sm)',
  letterSpacing: '.1rem',
  marginTop: '10px',
});

export const line = style({
  lineHeight: '1',
});

export const sbHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'var(--description-color)',
  borderBottom: '1px solid var(--description-color)',
  margin: '0 30px',
  paddingBottom: '18px',
  fontSize: 'var(--font-size-xs)',
});

export const customBtn = style({
  width: '100%',
  padding: '15px 20px',
  borderRadius: '40px',
});

export const linkBtn = style({
  width: '100%',
});

export const topBag = style({
  position: 'relative',
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const topBagTitle = style({
  fontSize: 'var(--font-size-xxl)',
  color: 'var(--title-color)',
});

export const wrapFirstChild = style({ transform: 'translate3d(0px, 0px, 0px)' });
