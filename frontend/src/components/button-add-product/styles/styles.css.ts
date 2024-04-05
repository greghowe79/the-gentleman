import { style } from '@vanilla-extract/css';

export const contentWrapper = style({
  display: ' flex',
  alignItems: 'center',
  padding: '10px 23px',
  border: '2px solid white',
  width: 'max-content',
  borderRadius: '40px',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

export const labelWrapper = style({
  marginLeft: '15px',
  color: 'white',
});
