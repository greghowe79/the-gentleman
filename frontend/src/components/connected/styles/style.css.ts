import { style } from '@vanilla-extract/css';

export const parent = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr) 0fr repeat(4, 1fr) 0fr',
  gridTemplateRows: '0.5fr repeat(3, 1fr) 0.5fr repeat(6, 1fr) 0.5fr',
  gridColumnGap: '20px',
  gridRowGap: '0px',
  height: 'calc(100vh - var(--header-height))',
  color: 'var(--description-color)',
});

export const div1 = style({
  gridArea: '2 / 10 / 5 / 12',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
});
export const div2 = style({
  gridArea: '2 / 8 / 5 / 10',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
});

export const div3 = style({
  gridArea: '6 / 8 / 12 / 12',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
});

export const div4 = style({
  gridArea: '6 / 3 / 12 / 7',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
});
export const div5 = style({
  gridArea: '2 / 1 / 13 / 3',
  backgroundColor: '#000',
  borderTopRightRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
});
export const div6 = style({
  gridArea: '2 / 5 / 5 / 7',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
});
export const balanceStyle = style({
  gridArea: '2 / 3 / 5 / 5',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'var(--default-text-color)',
  fontSize: 'var(--font-size-xxl2)',
  fontWeight: '500',
});

export const uploadButton = style({
  borderTopRightRadius: '0.5rem !important',
  borderRadius: 'inherit',
  width: '100%',
  backgroundColor: '#000',
  ':hover': {
    backgroundColor: 'var(--title-color)',
  },
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
});
