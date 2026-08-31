/**
 *
 * @param {*} obj
 * @param {*} props
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
