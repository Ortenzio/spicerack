import { toJson } from '@/utils/to-json.js';

/**
 * Serializes the model object into plain json
 *
 * @param {object} model
 * @returns {Promise<void>}
 */
export function copyToClipboard (model) {
  const obj = JSON.stringify(toJson(model), null, 2);
  return navigator.clipboard.writeText(obj);
}
