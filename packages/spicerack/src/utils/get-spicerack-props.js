import { THEMES } from '@/constants/themes';
import { POSITIONS } from '@/constants/positions';

/**
 *
 * @param {object} params - Generates the props for the App Component
 * @returns {object}
 */
export function getSpicerackProps ({
  config,
  model,
  registry,
  tokens,
  options
}) {
  return ({
    config,
    model,
    registry,
    tokens,
    version: import.meta.env.VITE_Spicerack_VERSION,
    title: options.title,
    theme: getThemeSetting(options.theme),
    position: getPositionSetting(options.position),
    open: getIsOpenSetting(options.open)
  });
}


/**
 * Storage precidence
 * 1 - options.open is true -> true
 * 2 - localStorage key 'sl:open', does not exist -> true
 * 3 - localStorage key 'sl:open' is strictly equal to 'true' -> true
 * 4 - otherwise, spiceracks is created in the closed state
 *
 * @param {boolean} isOpenOption
 * @returns {boolean} final setting
 */
function getIsOpenSetting (isOpenOption) {
  const storageOpen = localStorage.getItem('sl:open');
  const open = isOpenOption ?? (storageOpen === null ? true : localStorage.getItem('sl:open') === 'true');
  return open;
}

function getPositionSetting (positionOption) {
  return positionOption ?? localStorage.getItem('sl:corner') ?? POSITIONS.TOP_RIGHT;
}

function getThemeSetting (themeOption) {
  return themeOption ?? localStorage.getItem('sl:theme') ?? THEMES.DARK;
}
