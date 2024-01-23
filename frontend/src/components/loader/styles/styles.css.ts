import { style, keyframes } from '@vanilla-extract/css';

const moveX = keyframes({
  '0%': { top: '0%', transform: 'translateX(-50%) scale(1.5)' },
  '50%': { top: '-75%', transform: 'translateX(-50%) scale(0.5)' },
  '100%': { top: '-200%', transform: 'translateX(-50%) scale(1.5)' },
});

export const loaderContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  background: 'white',
});

export const loaderStyle = style({
  width: '32px',
  height: '32px',
  transform: 'translateY(100%)',
  borderRadius: '50%',
  background: 'var(--loader-color)',
  position: 'relative',

  '::before': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'var(--loader-color)',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '-200%',
  },
  '::after': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'var(--loader-color)',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '-200%',
    animation: `${moveX} 0.5s infinite linear alternate`,
  },
});
