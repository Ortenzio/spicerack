/**
 * @typedef {typeof THEMES[keyof typeof THEMES]} SpicerackTheme
 */

export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark'
});

export const NEXT_THEME = Object.freeze({
  [THEMES.LIGHT]: THEMES.DARK,
  [THEMES.DARK]: THEMES.LIGHT
});
