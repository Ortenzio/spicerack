export type SpicerackTheme = 'light' | 'dark';

export type SpicerackPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type SpicerackControl = object;

export interface SpicerackTokens {
  appEdgeSpacing?: string;
  appPadding?: string;
  appRadius?: string;
  appWidth?: string;
  appZIndex?: number;
  controlRadius?: string;
  controlGap?: string;
  fontSizeControl?: string;
  fontSizeInput?: string;
  fontSizeTitle?: string;
  bgColorAccent?: string;
  bgColorAccentHover?: string;
  bgColorActive?: string;
  bgColorAlt?: string;
  bgColorApp?: string;
  bgColorCard?: string;
  bgColorControl?: string;
  bgColorElm?: string;
  bgColorMuted?: string;
  fgColorAccent?: string;
  fgColorActive?: string;
  fgColorAlt?: string;
  fgColorApp?: string;
  fgColorCard?: string;
  fgColorElm?: string;
  fgColorMuted?: string;
  borderColorActive?: string;
  borderColorAlt?: string;
  borderColorApp?: string;
  borderColorCard?: string;
  borderColorElm?: string;
  borderColorMuted?: string;
}

export interface SpicerackConfig {
  key?: string;
  type?: string;
  value?: unknown;
  label?: string;
  config?: SpicerackConfig[];
  [prop: string]: unknown;
}

export interface SpicerackOptions {
  controls?: Record<string, SpicerackControl>;
  tokens?: SpicerackTokens;
  open?: boolean;
  // autoHide?: number;
  theme?: SpicerackTheme;
  position?: SpicerackPosition;
  title?: string;
}

export interface SpicerackModelField<T = unknown> {
  value: T;
  on(
    event: 'change',
    callback: (value: T, previousValue: T) => void
  ): () => void;
}

export type SpicerackModel = Record<string, SpicerackModelField>;

export interface SpicerackInstance {
  mount(target?: string | Element): unknown;
  model: SpicerackModel;
  json(): Record<string, unknown>;
  version: string;
}

export function createSpicerack (
  config: SpicerackConfig[],
  options?: SpicerackOptions
): SpicerackInstance;
