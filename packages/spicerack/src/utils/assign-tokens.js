import { TOKENS } from '@/constants/tokens.js';

/**
 * assign style tokens to the root elm
 *
 * @param {HTMLElement} rootElm
 * @param {Record<string, any>} tokens
 */
export function assignTokens (rootElm, tokens = {}) {
  for (const key of Object.keys(TOKENS)) {
    const [prop, val] = TOKENS[key];
    rootElm.style.setProperty(prop, Object.hasOwn(tokens, key) ? tokens[key] : val);
  }
}
