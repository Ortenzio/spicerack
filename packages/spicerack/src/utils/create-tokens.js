// import { ref, watch } from 'vue';
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


// export function createTokens (userTokens) {
//   const tokens = Object.create(null);

//   const state = ref(item.value);

//   tokens[item.key] = {
//     get value () {
//       return state.value;
//     },

//     set value (next) {
//       state.value = next;
//     },

//     on (event, fn) {
//       if (event !== 'change') {
//         throw new Error(`Unsupported event: ${event}`);
//       }

//       return watch(state, fn, {
//         flush: 'sync'
//       });
//     }
//   };

//   return tokens;
// }
