/**
 * @param {object} model - Proxy object for model
 * @returns {object} plain json
 */
export function toJson (model) {
  const results = Object.entries(model).reduce((acc, d) => {
    const [key, proxy] = d;
    acc[key] = proxy.value;
    return acc;
  }, {});
  return results;
}
