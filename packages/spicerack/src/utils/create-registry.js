/**
 *
 * @param {Record<type: string, definition: any>} initial
 * @returns {Map<string, any>}
 */
export function createRegistry (initial = {}) {
  const controls = new Map(Object.entries(initial));

  const registry = {
    register (type, definition) {
      controls.set(type, definition);
      return this;
    },
    get (type) {
      return controls.get(type);
    },
    has (type) {
      return controls.has(type);
    }
  };

  return registry;
}
