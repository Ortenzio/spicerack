/**
 * Use these keys should not be passed into
 * Spicerack Controls as v-bind=<props>.
 *
 * "value" should be used as the modelValue,
 * "key" should be unique
 * "type" is the control type
 *
 * @todo - can i use the values defined here to
 * destructure the config option to prevent code drift?
 *
 */
export const RESERVED_PROPS = new Set(['key', 'value', 'type', 'config']);
