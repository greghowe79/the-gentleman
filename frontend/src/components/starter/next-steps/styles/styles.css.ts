import { style } from '@vanilla-extract/css';

export const categoryImage = style({
  width: '75% !important',
});

export const shopCategoryButton = style({
  marginTop: '2rem',
  display: 'inline-flex',
  width: '40%',
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
  letterSpacing: '0.5px',
  ':hover': {
    boxShadow: '0 0 0 1px var(--title-color)',
    border: '2px solid var(--title-color)',
  },
});

export const sectionWrap = style({
  width: '100%',
  background: '#fcfcfc',
  display: 'flex',
  justifyContent: 'center',
});

export const itemsContainer = style({
  width: '100%',
  padding: '0 5rem',
  background: '#fcfcfc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const imageWrapper = style({
  width: '35%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const descriptionWrapper = style({
  width: '65%',
});

export const innerWrapper = style({
  padding: '60px 70px',
  color: 'var(--description-color)',
  letterSpacing: '0.5px',
});

export const titleWrap = style({
  color: 'var(--title-color)',
  fontFamily: 'var(--font-family-primary)',
  fontSize: 'var(--font-size-xxl)',
});

export const paragraphStyle = style({
  fontFamily: 'var(--font-family-secondary)',
});
