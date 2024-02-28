export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export const cart2iso = (x: number, y: number) => [
  x - y,
  (x + y) / 2
];

export const iso2cart = (x: number, y: number) => [
  (2 * y + x) / 2, 
  (2 * y - x) / 2
];
