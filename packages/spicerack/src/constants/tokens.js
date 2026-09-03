/**
 * Tokens can be configured by the user.
 *
 * @see {@type {Required<import('../types/spicerack').SpicerackTokens>}}
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
  appEdgeSpacing: ['--sr-app-edge', '0.5rem'],
  appPadding: ['--sr-app-padding', '0.5rem'],
  appRadius: ['--sr-app-radius', '0.5rem'],
  appWidth: ['--sr-app-width', '14rem'],
  appZIndex: ['--sr-app-z', 50],
  bgColorAccent: ['--sr-bg-accent', 'light-dark(oklch(57% 0.21 258), oklch(67% 0.18 258))'],
  bgColorAccentHover: ['--sr-bg-accent-hover', 'light-dark(oklch(63% 0.21 258), oklch(67% 0.10 258))'],
  bgColorActive: ['--sr-bg-active', 'light-dark(oklch(57% 0.21 258), oklch(67% 0.18 258))'],
  bgColorAlt: ['--sr-bg-alt', 'light-dark(oklch(91% 0 260), oklch(45% 0 260))'],
  bgColorApp: ['--sr-bg-app', 'light-dark(oklch(0.94 0 0), oklch(17% 0 260))'],
  bgColorControl: ['--sr-bg-control', 'light-dark(oklch(100% 0 260), oklch(30% 0 260))'],
  bgColorElm: ['--sr-bg-elm', 'light-dark(oklch(94% 0 260), oklch(13% 0 260))'],
  bgColorMuted: ['--sr-bg-muted', 'light-dark(oklch(96% 0.002 260), oklch(30% 0 260))'],
  bgColorSuccess: ['--sr-bg-success', 'light-dark(#E9F6E9, #1B2A1E)'],
  borderColorApp: ['--sr-border-app', 'light-dark(oklch(86% 0 260), oklch(34% 0.004 260))'],
  controlGap: ['--sr-control-gap', '0.25rem'],
  controlRadius: ['--sr-control-radius', '0.25rem'],
  fgColorAccent: ['--sr-fg-accent', 'light-dark(#000000, #000000)'],
  fgColorActive: ['--sr-fg-active', 'light-dark(oklch(100% 0 0), oklch(100% 0 260))'],
  fgColorAlt: ['--sr-fg-alt', 'light-dark(oklch(42% 0.01 260), oklch(78% 0.006 260))'],
  fgColorApp: ['--sr-fg-app', 'light-dark(oklch(24% 0.01 260), oklch(94% 0.004 260))'],
  fgColorElm: ['--sr-fg-elm', 'light-dark(oklch(26% 0.01 260), oklch(95% 0.003 260))'],
  fgColorMuted: ['--sr-fg-muted', 'light-dark(oklch(52% 0.008 260), oklch(68% 0.005 260))'],
  fgColorSuccess: ['--sr-fg-success', 'light-dark(#3E9B4F, #53B365)'],
  fontSizeControl: ['--sr-fs-control', '0.6875rem'],
  fontSizeInput: ['--sr-fs-input', '0.75rem'],
  fontSizeTitle: ['--sr-fs-title', '0.75rem']
};
