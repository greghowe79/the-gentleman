import { style } from '@vanilla-extract/css';

export const input = style({
  display: 'none',
});

export const formContainer = style({
  display: 'flex',
  alignItems: 'start',
  backgroundColor: 'rgb(203 213 225)',
});

export const form = style({
  padding: '30px',
  overflowY: 'auto',
  backgroundColor: 'white',
  borderRadius: '5px',
  position: 'relative',
  left: '15px',
  top: '30px',
  width: 'calc(100% - 90px)',
  height: 'calc(100% - var(--header-height) - 15px)',
});

export const flexWrapper = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const containerBlock = style({
  width: '510px',
  height: 'calc(100vh - var(--header-height))',
  position: 'sticky',
  top: '0',
  left: '0',
});

export const slidingContainer = style({
  width: 'calc(100vw - 525px)',
  position: 'absolute',
  right: '15px',
  top: 'calc(30px + var(--header-height))',
  borderRadius: '5px',
  backgroundColor: 'white',
});

export const previewContainer = style({
  height: 'var(--input-height-md)',
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(0,0,0,.04)',
  borderRadius: '0 8px 8px 0',
  color: 'var(--description-color)',
  letterSpacing: '1px',
  fontSize: 'var(--font-size-sm)',
  fontFamily: 'var(--font-family-secondary)',
  width: '380px',
});

export const preview = style({
  margin: '0',
  border: 'none',
});

export const labelWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '8px 0 0 8px',
  height: 'var(--input-height-md)',
  backgroundColor: 'rgb(134, 167, 208)',
  ':hover': {
    backgroundColor: 'rgba(99, 147, 206, 1)',
  },
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 15px',
  border: 'none',
  cursor: 'pointer',
  height: '100%',
  fontSize: 'var(--font-size-xs)',
  letterSpacing: '1px',
  fontFamily: 'var(--font-family-secondary)',
});

export const prevWrap = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  justifyItems: 'center',
  gap: '60px',
  padding: '30px',
});

export const imageWrap = style({
  height: '250px',
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--description-color)',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: '8px',
});

export const button = style({
  padding: '15px 20px',
  fontSize: '14px',
});

export const prodNameInputWrap = style({
  padding: '15px 0 0 0',
});

export const ctaWrap = style({
  padding: '20px 0 0 0',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '15px',
});

export const prodDescrTextWrap = style({
  display: 'flex',
  padding: '15px 0 0 0',
});

export const textAreaStyle = style({
  resize: 'none',
  border: 'none',
  backgroundColor: 'rgba(0,0,0,.04)',
  borderRadius: '8px',
  width: '100%',
  height: '25vh',
  padding: '20px 15px',
  overflowY: 'auto',
  zIndex: '2',
  overflowX: 'hidden',
  fontSize: 'var(--font-size-sm)',
  fontFamily: 'var(--font-family-secondary)',
  letterSpacing: '1px',
  color: 'var(--description-color)',
});
