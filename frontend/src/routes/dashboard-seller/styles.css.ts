import { style } from '@vanilla-extract/css';

export const container = style({
  background: '#fcfcfc',
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
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: 'var(--font-size-xxlmd)',
    },
  },
});

export const img_accessories = style({
  height: '100%',
  maxHeight: 'calc(100vh - var(--header-height))',
  display: 'flex',
});
export const wrapper = style({
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
});

export const wrap = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  zIndex: '1',
  fontFamily: 'var(--font-family-primary)',
  letterSpacing: '1px',
  display: 'flex',
  flexDirection: 'column',
});

export const overlay = style({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  background: 'rgb(0 0 0 / 40%)',
  backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.4) 100%)',
});

export const subtitle = style({
  fontSize: 'var(--font-size-xl)',
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: 'var(--font-size-amount)',
    },
  },
});

export const imgAccessoriesWrap = style({
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  width: '100%',
});
export const unorderList = style({
  listStyle: 'none',
});

export const advantages_container = style({
  backgroundColor: '#f3f3f3',
  padding: '20px',
  textAlign: 'left',
  borderRadius: '10px',
  height: '200px',
  marginTop: '50px',
  color: 'var(--default-text-color)',
  fontFamily: 'var(--font-family-secondary)',
  alignSelf: 'center',
  maxWidth: '680px',
  '@media': {
    'screen and (max-width: 820px)': {
      height: '150px',
      marginTop: '40px',
    },
  },
});

export const title = style({
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: 'var(--font-size-xxlmd)',
    },
  },
});
