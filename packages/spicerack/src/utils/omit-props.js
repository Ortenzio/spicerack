/**
 *
 * Given an object `obj`, return a copy that omits
 * and keys included in the set `props`
 *
 * This is used to exclude extraneous data being
 * bound to control components when using v-bind
 *
 * @param {*} obj
 * @param {Set} props
 * @returns {object}
 */
export function omitProps (obj, props) {
  const result = {};

  for (const key in obj) {
    if (!props.has(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
