import { TOKEN_MAP } from '@/constants/tokens.js';

/**
 * assign style tokens to the root elm
 *
 * @param {HTMLElement} rootElm
 * @param {Record<string, any>} tokens
 */
export function assignTokens (rootElm, tokens) {
  for (const token of Object.keys(TOKEN_MAP)) {
    const prop = TOKEN_MAP[token];
    const val = tokens[token];
    rootElm.style.setProperty(prop, val);
  }
}
