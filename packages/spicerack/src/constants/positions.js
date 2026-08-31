/**
 * @typedef {typeof POSITIONS[keyof typeof POSITIONS]} SpicerackPosition
 */

export const POSITIONS = Object.freeze({
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
});

export const NEXT_POSITION = Object.freeze({
  [POSITIONS.TOP_LEFT]: POSITIONS.TOP_RIGHT,
  [POSITIONS.TOP_RIGHT]: POSITIONS.BOTTOM_RIGHT,
  [POSITIONS.BOTTOM_RIGHT]: POSITIONS.BOTTOM_LEFT,
  [POSITIONS.BOTTOM_LEFT]: POSITIONS.TOP_LEFT
});
