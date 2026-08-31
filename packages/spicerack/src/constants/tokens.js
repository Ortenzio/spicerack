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

  fgColorAccent: 'light-dark(#000000, #000000)',
  fgColorActive: 'light-dark(oklch(100% 0 0), oklch(14% 0.01 260))',
  fgColorAlt: 'light-dark(oklch(42% 0.01 260), oklch(78% 0.006 260))',
  fgColorApp: 'light-dark(oklch(24% 0.01 260), oklch(94% 0.004 260))',
  fgColorCard: 'light-dark(oklch(24% 0.01 260), oklch(94% 0.004 260))',
  fgColorElm: 'light-dark(oklch(26% 0.01 260), oklch(95% 0.003 260))',
  fgColorMuted: 'light-dark(oklch(52% 0.008 260), oklch(68% 0.005 260))',

  borderColorActive: 'light-dark(oklch(50% 0.18 258), oklch(72% 0.14 258))',
  borderColorAlt: 'light-dark(oklch(68% 0.008 260), oklch(54% 0.007 260))',
  borderColorApp: 'light-dark(oklch(86% 0.004 260), oklch(34% 0.004 260))',
  borderColorCard: 'light-dark(oklch(82% 0.005 260), oklch(39% 0.005 260))',
  borderColorElm: 'light-dark(oklch(76% 0.006 260), oklch(46% 0.006 260))',
  borderColorMuted: 'light-dark(oklch(91% 0.003 260), oklch(28% 0.003 260))'
};

export const TOKEN_MAP = {
  appEdgeSpacing: '--sl-edge-spacing',
  appPadding: '--sl-app-padding',
  appRadius: '--sl-app-radius',
  appWidth: '--sl-app-width',
  appZIndex: '--sl-z',

  fontSizeControl: '--sl-fs-control',
  fontSizeInput: '--sl-fs-input',
  fontSizeTitle: '--sl-fs-title',

  controlRadius: '--sl-control-radius',
  controlGap: '--sl-control-gap',

  bgColorAccent: '--sl-bg-accent',
  bgColorAccentHover: '--sl-bg-accent-hover',
  bgColorActive: '--sl-bg-active',
  bgColorAlt: '--sl-bg-alt',
  bgColorApp: '--sl-bg-app',
  bgColorCard: '--sl-bg-card',
  bgColorControl: '--sl-bg-control',
  bgColorElm: '--sl-bg-elm',
  bgColorMuted: '--sl-bg-muted',

  fgColorAccent: '--sl-fg-accent',
  fgColorActive: '--sl-fg-active',
  fgColorAlt: '--sl-fg-alt',
  fgColorApp: '--sl-fg-app',
  fgColorCard: '--sl-fg-card',
  fgColorElm: '--sl-fg-elm',
  fgColorMuted: '--sl-fg-muted',

  borderColorActive: '--sl-border-active',
  borderColorAlt: '--sl-border-alt',
  borderColorApp: '--sl-border-app',
  borderColorCard: '--sl-border-card',
  borderColorElm: '--sl-border-elm',
  borderColorMuted: '--sl-border-muted'
};
