const modellessTypes = ['button', 'folder', 'tabs'];

/**
 * 
 * @param {import("../types/spicerack.d.ts").SpicerackConfig} item 
 * @returns {boolean}
 */
export function hasModel (item) {
  return modellessTypes.includes(item.type);
}
