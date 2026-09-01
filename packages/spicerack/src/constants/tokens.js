/**
 * @type {Required<import('../types/spicerack').SpicerackTokens>}
 *
 * Tokens can be configured by the user
 *
 * @example
 * ```js
 * createSpicerack(config, {
 *  tokens: {
 *    appZIndex: 100,
 *    fontSizeControl: '0.725rem'
 *  }
 * })
 * ```
 */
export const TOKENS = {
  appEdgeSpacing: '0.5rem',
  appPadding: '0.5rem',
  appRadius: '0.5rem',
  appWidth: '16rem',
  appZIndex: 50,

  controlRadius: '0.25rem',
  controlGap: '0.25rem',

  fontSizeControl: '0.6875rem',
  fontSizeInput: '0.75rem',
  fontSizeTitle: '0.75rem',

  bgColorAccent: 'light-dark(oklch(57% 0.21 258), oklch(67% 0.18 258))',
  bgColorAccentHover: 'light-dark(oklch(63% 0.21 258), oklch(67% 0.10 258))',
  bgColorActive: 'light-dark(oklch(57% 0.21 258), oklch(67% 0.18 258))',
  bgColorAlt: 'light-dark(oklch(91% 0 260), oklch(0% 0 260))',
  bgColorApp: 'light-dark(oklch(0.94 0 0), oklch(17% 0 260))',
  bgColorCard: 'light-dark(oklch(97% 0 260), oklch(21% 0 260))',
  bgColorControl: 'light-dark(oklch(100% 0 260), oklch(30% 0 260))',
  bgColorElm: 'light-dark(oklch(94% 0 260), oklch(13% 0 260))',
  bgColorMuted: 'light-dark(oklch(96% 0.002 260), oklch(30% 0 260))',
  bgColorSuccess: `light-dark(#E9F6E9, #1B2A1E)`,

  fgColorAccent: 'light-dark(#000000, #000000)',
  fgColorActive: 'light-dark(oklch(100% 0 0), oklch(14% 0.01 260))',
  fgColorAlt: 'light-dark(oklch(42% 0.01 260), oklch(78% 0.006 260))',
  fgColorApp: 'light-dark(oklch(24% 0.01 260), oklch(94% 0.004 260))',
  fgColorCard: 'light-dark(oklch(24% 0.01 260), oklch(94% 0.004 260))',
  fgColorElm: 'light-dark(oklch(26% 0.01 260), oklch(95% 0.003 260))',
  fgColorMuted: 'light-dark(oklch(52% 0.008 260), oklch(68% 0.005 260))',
  fgColorSuccess: `light-dark(#3E9B4F, #53B365)`,

  borderColorActive: 'light-dark(oklch(50% 0.18 258), oklch(72% 0.14 258))',
  borderColorAlt: 'light-dark(oklch(68% 0.008 260), oklch(54% 0.007 260))',
  borderColorApp: 'light-dark(oklch(86% 0.004 260), oklch(34% 0.004 260))',
  borderColorCard: 'light-dark(oklch(82% 0.005 260), oklch(39% 0.005 260))',
  borderColorElm: 'light-dark(oklch(76% 0.006 260), oklch(46% 0.006 260))',
  borderColorMuted: 'light-dark(oklch(91% 0.003 260), oklch(28% 0.003 260))'
};

export const TOKEN_MAP = {
  appEdgeSpacing: '--sr-edge-spacing',
  appPadding: '--sr-app-padding',
  appRadius: '--sr-app-radius',
  appWidth: '--sr-app-width',
  appZIndex: '--sr-z',

  fontSizeControl: '--sr-fs-control',
  fontSizeInput: '--sr-fs-input',
  fontSizeTitle: '--sr-fs-title',

  controlRadius: '--sr-control-radius',
  controlGap: '--sr-control-gap',

  bgColorAccent: '--sr-bg-accent',
  bgColorAccentHover: '--sr-bg-accent-hover',
  bgColorActive: '--sr-bg-active',
  bgColorAlt: '--sr-bg-alt',
  bgColorApp: '--sr-bg-app',
  bgColorCard: '--sr-bg-card',
  bgColorControl: '--sr-bg-control',
  bgColorElm: '--sr-bg-elm',
  bgColorMuted: '--sr-bg-muted',
  bgColorSuccess: '--sr-bg-success',

  fgColorAccent: '--sr-fg-accent',
  fgColorActive: '--sr-fg-active',
  fgColorAlt: '--sr-fg-alt',
  fgColorApp: '--sr-fg-app',
  fgColorCard: '--sr-fg-card',
  fgColorElm: '--sr-fg-elm',
  fgColorMuted: '--sr-fg-muted',
  fgColorSuccess: '--sr-fg-success',

  borderColorActive: '--sr-border-active',
  borderColorAlt: '--sr-border-alt',
  borderColorApp: '--sr-border-app',
  borderColorCard: '--sr-border-card',
  borderColorElm: '--sr-border-elm',
  borderColorMuted: '--sr-border-muted'
};
