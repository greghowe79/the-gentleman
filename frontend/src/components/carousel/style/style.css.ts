// src/styles/Carousel.css.ts
import { style } from '@vanilla-extract/css';

export const carousel = style({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',
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
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.2)',
  border: 'none',
  color: 'white',
  fontSize: '2em',
  cursor: 'pointer',
  zIndex: 1,
  padding: '7.5px 10px',
});

export const carouselControlPrev = style({
  left: '0',
});

export const carouselControlNext = style({
  right: '0',
});
