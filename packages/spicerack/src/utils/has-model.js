const modellessTypes = new Set(['button', 'folder', 'grouop', 'tabs']);

/**
 *
 * @todo - unused (for now)
 *
 * @param {import("../types/spicerack.d.ts").SpicerackConfig} item
 * @returns {boolean}
 */
export function hasModel (item) {
  return modellessTypes.has(item.type);
}
