/**
 *
 * @todo - unused (for now)
 *
 * @param {any} val
 * @returns {boolean}
 */
export function isPlainObject (val) {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}
