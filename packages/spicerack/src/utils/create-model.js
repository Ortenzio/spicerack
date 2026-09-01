import { ref, watch } from 'vue';

/**
 * @param {import('../types/spicerack').SpicerackConfig[]} config
 * @returns {import('../types/spicerack').SpicerackModel}
 */
export function createModel (config) {
  const fields = new Map();
  const model = Object.create(null);

  const walk = (items) => {
    for (const item of items) {

      if (!item) {
        continue;
      }

      if (item.config) {
        walk(item.config);
        continue;
      }

      if (item.type === 'button') {
        // buttons dont require a value prop
        // or key so they don't need to part
        // of the model
        continue;
      }

      if (typeof item.key !== 'string' || item.key.length === 0) {
        throw new Error('A valid key is required');
      }

      if (fields.has(item.key)) {
        // @todo - this could be more descriptive by constructing
        // a "path" value for nested configs
        throw new Error(`Duplicate control key "${item.key}"`);
      } else {
        fields.set(item.key, item);
      }

      const state = ref(item.value);

      model[item.key] = {
        get value () {
          return state.value;
        },

        set value (next) {
          state.value = next;
        },

        on (event, fn) {
          if (event !== 'change') {
            throw new Error(`Unsupported event: ${event}`);
          }

          return watch(state, fn, {
            flush: 'sync'
          });
        }
      };
    }
  };

  walk(config);

  return model;
}
