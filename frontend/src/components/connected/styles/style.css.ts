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
export const settingStyle = style({
  gridArea: '2 / 5 / 5 / 7',
  backgroundColor: '#fcfcfc',
  borderRadius: '0.5rem',
  boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const productsLabel = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  ':hover': {
    backgroundColor: 'var(--title-color)',
    borderTopRightRadius: '0.5rem !important',
  },
});

export const uploadButton = style({
  borderRadius: 'inherit',
  padding: '23px',
  width: 'inherit',
  backgroundColor: 'transparent',
});

export const listWrap = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const ulStyle = style({
  background: 'rgb(31, 31, 33)',
  marginTop: '40px',
  height: 'calc(100vh - var(--header-height) - 40px)',
  listStyle: 'none',
  borderTopRightRadius: '4px',
  padding: '0',
  width: '15%',
  minWidth: '150px',
  maxWidth: '160px',
});

export const labelStyle = style({
  marginLeft: '15px',
  width: '100px',
  textAlign: 'left',
});

export const liStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: 'calc((100vh - var(--header-height) - 80px) / 9)',
  ':hover': {
    backgroundColor: 'var(--title-color)',
  },
});

export const iconLabelWrap = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

export const contentStyle = style({
  color: 'var(--description-color)',
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - var(--header-height))',
});
