import { createApp } from 'vue';

import { createModel } from '@/utils/create-model';
import { createRegistry } from '@/utils/create-registry';
import { getCoreControls } from '@/utils/get-core-controls';
import { getSpicerackProps } from '@/utils/get-spicerack-props';
import { toJson } from '@/utils/to-json';

import Spicerack from '@/app.vue';

import './src/styles/index.css';

/**
 *
 * @param {import('./src/types/spicerack').SpicerackConfig[]} config
 * @param {import('./src/types/spicerack').SpicerackOptions} [options]
 * @returns {import('./src/types/spicerack').SpicerackInstance}
 */
export function createSpicerack (config, options = {}) {

  const coreControls = getCoreControls();
  const registry = createRegistry(({ ...coreControls, ...options.controls }));
  const model = createModel(config);

  /**
   *
   * @param {string | Element} [selector] - defaults to document.body
   * @returns {import("vue").ComponentPublicInstance}
   */
  const mount = (selector = document.body) => {
    return createApp(
      Spicerack,
      getSpicerackProps({
        config,
        model,
        registry,
        tokens: options.tokens,
        options
      })
    ).mount(selector);
  };

  return ({
    mount,
    model,
    json: () => toJson(model),
    version: `${import.meta.env.VITE_Spicerack_VERSION}`
  });
}
