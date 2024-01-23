import { style } from '@vanilla-extract/css';

export const selectStyle = style({
  background: 'rgba(0, 0, 0, 0.04)',
  width: '100%',
  height: '55px',
  border: 'none',
  padding: '0 15px',
  borderRadius: '8px',
  fontSize: 'var(--font-size-xs)',
  letterSpacing: '1px',
  cursor: 'pointer',
  color: 'var(--description-color)',
  fontFamily: 'var(--font-family-primary)',
});

export const customSelectStyle = style({
  width: '100%',
  height: '55px',
  border: 'none',
  padding: '0 15px',
  borderRadius: '8px',
  fontSize: 'var(--font-size-xs)',
  letterSpacing: '1px',
  cursor: 'default',
  color: 'var(--description-color)',
  fontFamily: 'var(--font-family-primary)',
});

export const labelStyle = style({
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(0,0,0,.04)',
  borderRadius: '8px',
});

export const pointer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '70px',
  height: '55px',
  borderRadius: '8px',
  ':hover': {
    backgroundColor: 'rgba(0,0,0,.04)',
  },
});

export const ulContainer = style({
  position: 'absolute',
  background: 'rgba(245, 245, 245, 1)',
  zIndex: '3',
  width: 'calc(100% - 60px)',
  marginTop: '15px',
  color: 'var(--description-color)',
  borderRadius: '8px',
  boxShadow: '0 0 0 1.5px hsla(0, 0%, 47%)',
});

export const listStyle = style({
  listStyle: 'none',
  padding: '15px 0',
});

export const listItem = style({
  cursor: 'pointer',
  paddingLeft: '15px',
  ':hover': {
    backgroundColor: 'var(--description-color)',
    color: 'white',
  },
});
