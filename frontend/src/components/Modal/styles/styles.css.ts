import { style } from '@vanilla-extract/css';

const modalOverlay = style({
  height: '100vh',
  width: '100%',
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const modalWrapper = style({
  width: '40%',
  backgroundColor: '#fcfcfc',
  color: 'var(--default-text-color)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '4px',
  gap: '40px',
  boxShadow: '0 8px 28px #00000047',
});

const modalText = style({
  fontFamily: 'var(--font-family-secondary)',
  alignSelf: 'flex-start',
});

const buttonsWrapper = style({
  display: 'flex',
  alignSelf: 'flex-end',
  gap: '10px',
});

const buttonsStyle = style({
  padding: '15px 20px',
  fontFamily: 'var(--font-family-primary)',
  letterSpacing: '0.04rem',
});

const buttonsStyleCancel = style({
  backgroundColor: 'transparent',
  color: 'var(--default-text-color)',
  border: '3px solid var(--default-text-color)',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const buttonsStyleDelete = style({
  backgroundColor: 'var(--title-color)',
  ':hover': {
    backgroundColor: 'rgb(149, 46, 40)',
  },
});

const cancelButtonStyle = [buttonsStyle, buttonsStyleCancel];
const deleteButtonStyle = [buttonsStyle, buttonsStyleDelete];

export { modalOverlay, modalWrapper, modalText, buttonsWrapper, cancelButtonStyle, deleteButtonStyle };
