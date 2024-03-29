import { style } from '@vanilla-extract/css';

export const container = style({
  border: '1px solid white',
  padding: '16px',
  width: '400px',

  display: 'grid',
  gridTemplateAreas: '"c a a ." "c . b b" "d d b b"',
  gridTemplateRows: 'repeat(3, 1fr)',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '8px',
});
export const a = style({
  gridArea: 'a',
  backgroundColor: '#4d7c0f',
});
export const b = style({
  gridArea: 'b',
  backgroundColor: '#0e7490',
});
export const c = style({
  gridArea: 'c',
  backgroundColor: '#b91c1c',
});
export const d = style({
  gridArea: 'd',
  backgroundColor: '#a16207',
});
