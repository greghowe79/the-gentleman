import { style } from '@vanilla-extract/css';

export const selectStyle = style({
  background: 'rgba(0, 0, 0, 0.04)',
  width: '100%',
  height: 'var(--input-height-md)',
  border: 'none',
  padding: '0 15px',
  borderRadius: '8px',
  fontSize: 'var(--font-size-sm)',
  letterSpacing: '1px',
  cursor: 'pointer',
  color: 'var(--description-color)',
  fontFamily: 'var(--font-family-secondary)',
});

export const customSelectStyle = style({
  width: '100%',
  height: 'var(--input-height-md)',
  border: 'none',
  padding: '0 15px',
  borderRadius: '8px',
  fontSize: 'var(--font-size-sm)',
  letterSpacing: '1px',
  cursor: 'default',
  color: 'var(--description-color)',
  fontFamily: 'var(--font-family-secondary)',
  pointerEvents: 'none',
});

export const labelStyle = style({
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(0,0,0,.04)',
  borderRadius: '8px',
  cursor: 'pointer',
});

export const pointer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '70px',
  height: 'var(--input-height-md)',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
});

export const ulContainer = style({
  position: 'absolute',
  background: '#ffffff',
  zIndex: '3',
  width: 'calc(100% - 60px)',
  marginTop: '15px',
  color: 'var(--description-color)',
  borderRadius: '8px',
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
  overflowY: 'auto',
  height: 'auto',
  maxHeight: '380px',
});

export const listStyle = style({
  listStyle: 'none',
  padding: '0',
  fontFamily: 'var(--font-family-secondary)',
  fontSize: 'var(--font-size-sm)',
});

export const listItem = style({
  cursor: 'pointer',
  paddingLeft: '12px',
  height: 'var(--input-height-md)',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    backgroundColor: 'var(--list-item-background)',
  },
});
