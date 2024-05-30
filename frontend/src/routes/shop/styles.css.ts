import { style } from '@vanilla-extract/css';

export const shopArea = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
});

export const shopContainer = style({
  backgroundColor: '#fcfcfc',
  height: 'auto',
  width: 'var(--shop-container-width)',
});

export const shopHeaderArea = style({
  position: 'fixed',
  height: 'var(--top-bar-height)',
  width: 'var(--shop-container-width)',
  zIndex: '1',
});

export const shopHeaderContainer = style({
  position: 'relative',
  height: '100%',
  borderBottom: '1px solid rgba(0,0,0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fcfcfc',
});

export const shopBreadcrumb = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
});

export const spanStyle = style({
  display: 'flex',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  cursor: 'pointer',
  position: 'relative',
  fontSize: 'var(--font-size-sm)',
});

export const pointStyle = style({
  color: 'var(--description-color)',
});

export const priceStyle = style({
  fontSize: 'var(--font-size-md)',
});

export const linkStyle = style({
  fontSize: 'var(--font-size-sm)',
  fontFamily: 'var(--font-family-secondary)',
  fontWeight: '600',
  letterSpacing: '1px',
  lineHeight: 'var(--line-height-md)',
});

export const shopTitleStyle = style({
  fontSize: 'var(--font-size-xxl2)',
  margin: '0',
  letterSpacing: '-4px',
  display: 'inline-flex',
  color: 'var(--title-color)',
});

export const shopWrapperContent = style({
  paddingTop: '60px',
  paddingBottom: '60px',
  marginLeft: '60px',
  marginRight: '60px',
  position: 'relative',
  marginTop: 'var(--top-bar-height)',
  display: 'flex',
  alignItems: 'flex-start',
  color: 'var(--description-color)',
});

export const categoryMenuContainer = style({
  width: 'max-content',
  padding: '0 30px 0 0',
  fontFamily: 'var(--font-family-primary)',
  position: 'sticky',
  top: '0',
  height: 'max-content',
});

export const leftWrapper = style({
  width: '75%',
  padding: '0 30px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'var(--font-family-tertiary)',
});

export const stickyImageContainer = style({
  width: '55%',
  // display: 'flex',
  maxWidth: '680px',
  justifyContent: 'center',
  padding: '30px 17px',
  fontFamily: 'var(--font-family-primary)',
  position: 'sticky',
  //height: 'calc((100vh - var(--header-height) - var(--top-bar-height)))',
  alignSelf: 'flex-start',
});

export const spacer = style({
  marginTop: '41.7px',
  wordWrap: 'break-word',
});

export const spacerFirst = style({
  letterSpacing: '0.06rem',
});

export const leftWrapperDetail = style({
  width: '45%',
  padding: '0 17px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'var(--font-family-tertiary)',
  alignSelf: 'flex-start',
});
export const quantityWrapper = style({
  display: 'flex',
  alignItems: 'center',
});
export const label = style({
  display: 'inline-flex',
  color: 'var(--product-name-color)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-md)',
  letterSpacing: '1px',
  fontFamily: 'var(--font-family-secondary)',
});

export const priceDetail = style({
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-lg)',
  letterSpacing: '-0.15px',
  marginTop: '41.7px',
  fontWeight: '600',
});

export const pdName = style({
  fontFamily: 'var(--font-family-primary)',
  color: 'var(--product-name-color)',
  fontSize: 'var(--font-size-xl)',
  lineHeight: ' var(--line-height-sm)',
  fontWeight: 'normal',
  letterSpacing: '-1px',
});

export const pdMainWrap = style({
  width: '33.33%',
  marginTop: '60px',
});

export const pdInnerWrap = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  textAlign: 'center',
});

export const pdDesc = style({
  fontSize: ' var(--font-size-xs)',
  lineHeight: 'var(--line-height-md)',
  letterSpacing: ' 1px',
  wordWrap: 'break-word',
});

export const catDesc = style({
  margin: '0',
  letterSpacing: '0.06rem',
});

export const titleWrapper = style({
  display: 'inline-flex',
  fontSize: 'var(--font-size-xxl1)',
  letterSpacing: '-0.15px',
  fontFamily: 'var(--font-family-primary)',
  color: 'var(--title-color)',
  fontWeight: '400',
});

export const catDescWrapper = style({
  paddingTop: '42px',
  width: '100%',
});

export const detail = style({
  display: 'flex',
  flexDirection: 'column',
  height: '150px',
  marginTop: '30px',
});

export const imgWrap = style({
  position: 'relative',
  borderRadius: '50%',
  overflow: 'hidden',
  background: '#e8e9eb',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '80% 80%',
});

export const image = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
});

export const imgLink = style({
  padding: '0 15px',
});
export const contPad = style({
  paddingTop: '100%',
});

export const imageStyle = style({
  width: '60% !important',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  borderRadius: '50%',
  transition: 'transform 0.6s cubic-bezier(0.57, 0.05, 0, 1.32)',
  selectors: {
    [`${pdInnerWrap}:hover &`]: {
      transform: 'translate(-50%, -50%) scale(1.1)',
    },
  },
});

export const detailImage = style({
  height: '100%',
  maxHeight: '680px',
  maxWidth: '680px',
  userSelect: 'none',
  borderRadius: '20px',
});

export const detailDescription = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '60px',
  paddingBottom: '30px',
  width: '85%',
});

export const titlePrice = style({
  display: 'flex',
  alignItems: 'baseline',
});

export const titleDetail = style({
  flex: '1',
  fontWeight: 'normal',
  fontSize: 'unset',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const titleContainer = style({
  display: 'inline-flex',
  color: 'var(--title-color)',
  fontFamily: 'var(--font-family-primary)',
  fontSize: 'var(--font-size-xxl1)',
  lineHeight: 'var(--line-height-xs)',
  letterSpacing: '0',
  fontWeight: '400',
  textAlign: 'left',
});

export const categoryWrapper = style({
  display: 'inline-flex',
  color: 'var(--product-name-color)',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-sm)',
  lineHeight: 'var(--line-height-md)',
  letterSpacing: '1px',
  fontWeight: '600',
});

export const categoryStyle = style({
  fontWeight: '600',
});

export const shopWrapperDetailContent = style({
  paddingTop: '0',
  paddingBottom: '60px',
  width: '1224px',
  position: 'relative',
  margin: 'var(--top-bar-height) auto 0 auto',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  color: 'var(--description-color)',
});

export const thumbnailsWrapper = style({
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  padding: '20px',
});

export const thumbnail = style({
  width: '50px',
  cursor: 'default',
  background: 'none',
  padding: '1px',
  position: 'relative',
  borderRadius: '50%',
  margin: '5px 10px',
  minHeight: '8px',
  transition: 'all 0.3s ease',
});

export const svgDivThumbnail = style({
  position: 'absolute',
  top: '-2px',
  left: '-2px',
  transform: 'rotateZ(90deg)',
  color: 'var(--product-name-color)',
  display: 'inline-flex',
  fontSize: '0',
});

export const cartButtonStyle = style({
  display: 'inline-flex',
  width: '85%',
  backgroundColor: 'transparent',
  color: 'var(--default-text-color)',
  borderRadius: '25px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 16px',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-md)',
  height: 'var(--cta-add-to-cart)',
  border: '2px solid var(--default-text-color)',
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: '0 0 0 1px var(--default-text-color)',
  },
});

export const buyItNowButtonStyle = style({
  display: 'inline-flex',
  width: '85%',
  backgroundColor: 'var(--title-color)',
  color: '#ffffff',
  borderRadius: '25px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 16px',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-md)',
  height: 'var(--cta-add-to-cart)',
  border: '2px solid var(--title-color)',
  transition: 'all 0.3s ease', // Aggiunta la transizione per un effetto fluido
  ':hover': {
    boxShadow: '0 0 0 1px var(--product-name-color)', // Box-shadow per espandere verso l'esterno
    backgroundColor: 'var(--product-name-color)',
    border: '2px solid var(--product-name-color)',
  },
});

export const cartButtonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '30px',
});

export const butItNowButtonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  top: '10px',
  position: 'relative',
});

export const Wrap = style({
  flexDirection: 'row',
  height: '100%',
  maxHeight: '680px',
  alignItems: 'center',
  justifyContent: 'stretch',
  userSelect: 'none',
  background: 'rgba(0, 0, 0, 0.03)',
  borderRadius: '20px',
});

export const priceWrapStyle = style({
  marginTop: 'auto',
});

export const textDescription = style({
  width: '100%',
  height: '70px',
});
