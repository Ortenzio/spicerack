/**
 * @param {object} props
 * @param {string} [props.type]
 * @param {any} [props.value]
 * @param {array} [props.config]
 * @returns {string}
 */
export function getControlType ({
  type,
  value,
  config,
  on
}) {

  if (type) {
    return type;
  }

  // Controls with config properties
  // should be treaded as folders by
  // default, since that's the only
  // built in that currently supports
  // the config prop.
  if (config) {
    return 'folder';
  }

  if (!value && typeof on === 'function') {
    return 'button';
  }

  switch (typeof value) {
    case 'number': { return 'number'; }
    case 'boolean': { return 'boolean'; }
    case 'string': { return 'text'; }
    default: { return 'text'; }
  }

}
