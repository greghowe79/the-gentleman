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
  /*   position: 'sticky', */
  position: 'fixed',
  height: 'var(--top-bar-height)',
  width: 'var(--shop-container-width)',
  zIndex: '1',
  top: 'var(--header-height)',
  transition: 'transform 150ms ease',
});

export const hidden = style({
  transform: 'translateY(-141px)',
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

// export const leftWrapper = style({
//   flex: '1',
//   /*   width: '100%', */
//   padding: '0 30px',
//   display: 'flex',
//   justifyContent: 'flex-start',
//   transition: 'flex 0.5s ease',
//   flexWrap: 'wrap',

//   fontFamily: 'var(--font-family-tertiary)',
// });

export const stickyImageContainer = style({
  height: '669px',
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  position: 'sticky',
  top: '40px',
  paddingLeft: '48px',
  marginLeft: '8px',
  minHeight: '455px',
  marginTop: '48px',
  marginRight: '8px',
  fontFamily: 'var(--font-family-primary)',
});

export const imageThumbnailsWrap = style({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: '8px',
  flexGrow: '1',
  minWidth: '60px',
  maxWidth: '60px',
  height: '100%',
  overflowY: 'scroll',
});

export const spacer = style({
  marginTop: '41.7px',
  wordWrap: 'break-word',
});

export const spacerFirst = style({
  letterSpacing: '0.06rem',
});

export const leftWrapperDetail = style({
  width: '456px',
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
  fontSize: 'var(--font-size-lg)',
  lineHeight: ' var(--line-height-sm)',
  fontWeight: 'normal',
  letterSpacing: '-0.5px',
});

export const pdMainWrap = style({
  width: '33.33333333333333%',
});

export const pdInnerWrap = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  textAlign: 'left',
});

export const pdDesc = style({
  fontSize: ' var(--font-size-standard)',
  lineHeight: 'var(--line-height-md)',
  color: 'var(--description-color)',
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
  padding: '12px 0 2px 0',
});

export const imgWrap = style({
  position: 'relative',
  borderRadius: '10px',
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  borderRadius: '10px',
  transition: 'transform 0.6s cubic-bezier(0.57, 0.05, 0, 1.32)',
  selectors: {
    [`${pdInnerWrap}:hover &`]: {
      transform: 'translate(-50%, -50%) scale(1.1)',
    },
  },
});

export const detailImage = style({
  userSelect: 'none',
  borderRadius: '8px',
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
  fontSize: 'var(--font-size-xxlmd)',
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
  height: 'auto',
  maxWidth: '1200px',
  margin: 'var(--top-bar-height) auto 0 auto',
  display: 'flex',
  color: 'var(--description-color)',
  paddingBottom: '48px',
});

export const leftContainer = style({
  width: 'calc(100% - 456px)',
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

export const divThumb = style({
  height: '60px',
  borderRadius: '5px',
  position: 'relative',
  display: 'inline-block',
});

export const thumbnailImage = style({
  borderRadius: '4px',
  background: 'rgb(245, 245, 245)',
  width: '100%',
  height: '100%',
});

export const thumbnailOverlay = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.2)',
  opacity: '0',
  transition: 'opacity 0.3s ease',
  borderRadius: '5px',
});

export const cartButtonStyle = style({
  display: 'inline-flex',
  width: '100%',
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
  width: '100%',
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
  transition: 'all 0.3s ease',
  ':hover': {
    boxShadow: '0 0 0 1px var(--product-name-color)',
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
  width: '535px',
  maxWidth: '535px',
  height: '100%',
  userSelect: 'none',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
  flexGrow: '1',
});

export const priceWrapStyle = style({
  marginTop: 'auto',
});

export const textDescription = style({
  width: '100%',
  margin: '0',
});

/* --------------------------------------------------- */

export const wall = style({
  position: 'relative',
  zIndex: '0',
  paddingLeft: '0px',
  paddingRight: '0px',
  width: '100%',
  marginLeft: '0px',
  marginRight: '0px',
});

export const results = style({
  maxWidth: '1920px',
  position: 'relative',
  minHeight: '1px',
  fontSize: '16px',
  lineHeight: '1.75',
  width: '100%',
  display: 'inline-block',
  padding: 0,
  textAlign: 'left',
});

export const wallHeaderOffset = style({
  height: '15px',
});

export const wallBreadcrumbs = style({
  paddingLeft: '48px',
  paddingRight: '48px',
  textAlign: 'left',
  lineHeight: '1',
});

export const wallBreadcrumbsList = style({
  margin: '0',
  padding: '0',
  listStyle: 'none',
  listStyleType: 'none',
  textAlign: 'left',
  lineHeight: '1',
  height: '16px',
});

export const linkWallBreadcrumbsItem = style({
  width: 'auto',
  fontSize: 'var(--font-size-middle)',
  fontWeight: '500',
  lineHeight: '1em',
  margin: '0',
  display: 'inline-block',
  verticalAlign: 'top',
});

export const wallBreadcrumbsSeparator = style({
  padding: '0 6px',
  width: 'auto',
  fontSize: 'var(--font-size-middle)',
  fontWeight: '500',
  lineHeight: '1em',
  margin: '0',
  display: 'inline-block',
  verticalAlign: 'top',
  border: '0',
  font: 'inherit',
  color: 'var(--default-text-color)',
});

export const pointHeaderPositionAnchor = style({
  width: '1px',
  height: '1px',
  display: 'block',
  pointerEvents: 'none',
});

export const headerPosition = style({
  position: 'sticky',
  left: '0',
  zIndex: '9',
  transition: 'transform 150ms ease',
  top: '0px',
  transform: 'translateY(0px)',
});

export const wallHeaderShowCount = style({
  padding: '0px 48px 15px',
  background: '#fcfcfc',
  display: 'block',
  maxWidth: '1920px',
});

export const wallHeaderContent = style({
  paddingTop: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  fontFamily: 'var(--font-family-primary)',
});

export const wallHeaderTitle = style({
  marginTop: '-12px',
  flex: '1 1 0%',
  fontSize: 'var(--font-size-xl)',
  lineHeight: '1.3',
  paddingBottom: '2px',
  transform: 'scale(1)',
  transformOrigin: 'left center',
  transition: 'transform 200ms',
  textAlign: 'left',
  verticalAlign: 'baseline',
  color: 'var(--default-text-color)',
  letterSpacing: '0.5px',
});

export const wallHeaderItemCount = style({
  paddingLeft: '.25em',
});

export const wallHeaderNav = style({
  display: 'inline-flex',
  alignItems: ' baseline',
});

export const filtersBtn = style({
  display: 'flex',
  fontSize: 'var(--font-size-standard)',
  padding: '0px 25px 0px 0px',
  background: 'transparent',
  alignItems: 'center',
  fontWeight: '400',
  boxSizing: 'border-box',
  border: 'none',
  cursor: 'pointer',
  lineHeight: 'inherit',
  overflow: 'visible',
  margin: 0,
  fontFamily: 'var(--font-family-primary)',
  textTransform: 'none',
});

export const filtersBtnFilterText = style({
  paddingRight: '8px',
  color: 'var(--default-text-color)',
  letterSpacing: '0.5px',
});

export const iconFilterDs = style({
  marginTop: '2px',
  color: 'var(--default-text-color)',
});

export const sort = style({
  fontSize: 'var(--font-size-standard)',
  color: 'var(--default-text-color)',
});

export const dropdownAnchoredRight = style({
  position: 'relative',
  backgroundColor: '#fcfcfc',
  maxWidth: '300px',
});

export const dropdownBtn = style({
  width: '100%',
  textAlign: 'right',
  backgroundColor: 'white',
  padding: '0px 6px',
  boxSizing: 'border-box',
  border: 'none',
  cursor: 'pointer',
  overflow: 'visible',
  display: 'inline-flex',
  margin: '0',
  textTransform: 'none',
});

export const dropdownBtnTextWrapper = style({
  display: 'inline-block',
});

export const dropdownBtnText = style({
  color: 'var(--default-text-color)',
  fontSize: 'var(--font-size-standard)',
  fontFamily: 'var(--font-family-primary)',
  letterSpacing: '0.5px',
});

export const dropdownBtnSelectedText = style({
  color: 'rgb(112, 112, 114)',
  fontFamily: 'var(--font-family-primary)',
});

export const iconChevron = style({
  marginLeft: '8px',
  display: 'inline-block',
  top: '8px',
  width: '14px',
  height: '14px',
  position: 'relative',
});

export const dropdownOptionsWrapper = style({
  right: '0',
  position: 'absolute',
  top: '100%',
  overflow: 'hidden',
  zIndex: '2',
});

export const dropdownPptionsList = style({
  borderRadius: '0px 0px 0px 20px',
  paddingBottom: '15px',
  paddingRight: '28px',
  paddingTop: '24px',
  transition: 'transform 300ms ease 0s',
  background: '#fcfcfc',
});

export const dropdownOption = style({
  textAlign: 'right',
  padding: '0px 0px 0px 24px',
  width: '100%',
  whiteSpace: 'nowrap',
  display: 'block',
  background: 'transparent',
  color: 'var(--default-text-color)',
  fontFamily: 'var(--font-family-secondary)',
  ':hover': {
    color: 'rgb(112, 112, 114)',
  },
});

// export const resultsBody = style({
//   display: 'flex',
//   transition: 'transform 300ms ease',
//   width: '100%',
// });

// export const inScroller = style({
//   top: '154px',
//   width: '0',
//   position: 'sticky',
//   whiteSpace: 'nowrap',
//   transition: 'transform 300ms ease',
//   height: '1600px',
// });

export const simpleWrapper = style({
  margin: '0px',
  overflow: 'hidden',
  width: 'inherit',
  height: 'inherit',
  maxWidth: 'inherit',
  maxHeight: 'inherit',
});

export const simplebarHeightAutoObserverWrapper = style({
  boxSizing: 'inherit',
  height: '100%',
  width: '100%',
  maxWidth: '1px',
  position: 'relative',
  float: 'left',
  maxHeight: '1px',
  overflow: 'hidden',
  zIndex: '-1',
  padding: '0',
  margin: '0',
  pointerEvents: 'none',
});

export const simplebarHeightAutoObserver = style({
  position: 'absolute',
  overflow: 'hidden',
  pointerEvents: 'none',
  boxSizing: 'inherit',
  display: 'block',
  opacity: '0',
  top: '0',
  left: '0',
  height: '1000%',
  width: '1000%',
  minHeight: '1px',
  minWidth: '1px',
  zIndex: '-1',
});

export const simplebarMask = style({
  position: 'absolute',
  padding: '0',
  margin: '0',
  left: '0',
  top: '0',
  bottom: '0',
  right: '0',
  direction: 'inherit',
  overflow: 'hidden',
  width: 'auto !important',
  height: 'auto !important',
  zIndex: 0,
});

export const simplebarOffset = style({
  overflowY: 'auto',
  overflowX: 'hidden',
  right: '0px',
  bottom: '0px',
  direction: 'inherit',
  boxSizing: 'inherit',
  position: 'absolute',
  padding: '0',
  margin: '0',
  left: '0',
  top: '0',
});

export const simplebarContentWrapper = style({
  height: 'auto',
  direction: 'inherit',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'block',
  width: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  scrollbarWidth: 'none',
});

export const simplebarContent = style({
  padding: '0px',
});

export const leftNavWrapper = style({
  width: '240px',
  padding: '0 0 1em 48px',
});

export const leftNavCategoriesPresent = style({
  position: 'relative',
  background: '#fcfcfc',
  fontWeight: '400',
  lineHeight: '1.5',
});

export const categoriesIsDesktop = style({
  padding: '0 0 40px',
});

export const categoriesItem = style({
  marginTop: '0',
  color: 'var(--default-text-color)',
  fontWeight: '500',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  lineHeight: '1.35em',
  background: 'transparent',
  cursor: 'pointer',
  display: 'block',
  margin: '0',
  marginLeft: '4px',
  position: 'relative',
  textAlign: 'left',
  width: '96%',
  padding: '0 1.1em 10px 0',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-custom)',
  ':hover': {
    background: 'rgb(246, 246, 246)',
  },
});

export const collapsibleFilterGroupFilterGroupClosed = style({
  borderTop: 'solid 1px #e5e5e5',
  width: '100%',
  textAlign: 'left',
  padding: '0',
  borderBottom: 'solid 1px #e5e5e5',
  display: 'block',
  lineHeight: '28px',
  transition: 'visibility 150ms ease 0s',
});

export const collapseTrigger = style({
  display: 'block',
});

export const triggerContent = style({
  padding: '12px 0',
  width: '98%',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const triggerContentLabel = style({
  display: 'inline-block',
  width: '93%',
  color: 'var(--default-text-color)',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-custom)',
});

export const filterGroupCountIsHidden = style({
  display: 'none',
});

export const iconChevronFilters = style({
  width: '14px',
  display: 'flex',
  alignItems: 'center',
});

export const collapsibleContentOuter = style({
  marginLeft: '-4px',
  marginTop: '5px',
  height: '106px',
  transition: 'height 150ms linear 0s',
  overflow: 'hidden',
});

export const collapsibleContentOuterSize = style({
  marginLeft: '-4px',
  marginTop: '5px',
  height: '441px',
  transition: 'height 150ms linear 0s',
  overflow: 'hidden',
});

export const ContentOuterHidden = style({
  height: '0',
  transition: 'height 150ms linear 0s',
});

export const collapsibleContentInnerFilterGroupContent = style({
  padding: '0 0 20px',
});

export const filterItemIsDefault = style({
  margin: '4px 2px',
  display: 'flex',
  background: 'transparent',
  color: 'var(--default-text-color)',
  cursor: 'pointer',
  overflowWrap: 'break-word',
  position: 'relative',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  width: '96%',
  alignItems: 'center',
  padding: '0',
});

export const filterItemSize = style({
  height: '36px',
  textAlign: 'center',
  border: 'solid 1px var(--default-text-color)',
  borderRadius: '5px',
  marginRight: '6px',
  marginBottom: '6px',
  flex: '1 0 56px',
  justifyContent: 'center',
  background: 'transparent',
  color: 'var(--default-text-color)',
  display: 'flex',
  cursor: 'pointer',
  overflowWrap: 'break-word',
  position: 'relative',
  whiteSpace: 'nowrap',
  width: '96%',
  alignItems: 'center',
  padding: '0',
});

export const filterGroupItemsGroup = style({
  display: 'flex',
  flexWrap: 'wrap',
});

export const pseudoCheckbox = style({
  marginTop: '2px',
  flexShrink: '0',
  width: '20px',
  height: '20px',
  verticalAlign: 'top',
  border: 'solid 1px var(--default-text-color)',
  borderRadius: '4px',
  marginRight: '6px',
  display: 'inline-block',
  position: 'relative',
});

export const filterItemLabel = style({
  display: 'inline-block',
  wordBreak: 'break-word',
  whiteSpace: 'normal',
});

export const groupContent = style({
  margin: '0 -6px 0 0',
  padding: '7px 0 14px',
});
