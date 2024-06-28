// src/styles/Carousel.css.ts
import { style } from '@vanilla-extract/css';

export const carousel = style({
  position: 'relative',
  width: '100%',
  margin: 'auto',
  overflow: 'hidden',
});

export const carouselInner = style({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
});

export const carouselItem = style({
  minWidth: '100%',
  transition: 'opacity 0.5s ease-in-out',
  textAlign: 'center',
});

export const carouselItemImage = style({
  width: '100%',
  display: 'block',
});

export const carouselControl = style({
  position: 'absolute',
  top: '10%',
  transform: 'translateY(-50%)',
  background: '#fcfcfc',
  border: 'none',
  color: 'black',
  cursor: 'pointer',
  zIndex: 1,
  padding: '0',
  height: '36px',
  width: '36px',
  borderRadius: '999px',
});

export const carouselControlPrev = style({
  right: '68px',
});

export const carouselControlNext = style({
  right: '25px',
});
