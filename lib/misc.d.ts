export const InstantFlags: InstantFlags;
export const version: string;
export const chipNames: Array<string>;
/**
 * Get instant line value
 * @param {number} chipNumber - The chip number
 * @param {number} lineNumber - The line number
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The line number
 * @returns {0|1} - The current value of the line
 */
export function getInstantLineValue(chipNumber: number, lineNumber: number, { activeLow, consumer }?: {
    activeLow?: boolean;
    consumer?: string;
}): 0 | 1;
/**
 * Set instant line value
 * @param {number} chipNumber  - The chip number
 * @param {number} lineNumber  - The line number
 * @param {0|1} value - The value to set the line to. Must be 0 or 1
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The line number
 * @param {function} [options.callback] - The callback function to call when the operation is complete
 */
export function setInstantLineValue(chipNumber: number, lineNumber: number, value: 0 | 1, { activeLow, consumer, callback }?: {
    activeLow?: boolean;
    consumer?: string;
    callback?: Function;
}): any;
/**
 * Get instant line values
 * @param {number} chipNumber - The chip number
 * @param {Array<number>} lineNumbers - An array of line numbers
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The consumer name
 * @returns {Array<number>} - An array of current values for the lines
 */
export function getInstantLineValues(chipNumber: number, lineNumbers: Array<number>, { activeLow, consumer }?: {
    activeLow?: boolean;
    consumer?: string;
}): Array<number>;
/**
 * Set instant line values
 * @param {number} chipNumber - The chip number
 * @param {Array<number>} lineNumbers - An array of line numbers
 * @param {Array<number>} values - An array of values to set the lines to. Must be 0 or 1
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The consumer name
 * @param {function} [options.callback] - The callback function to call when the operation is complete
 */
export function setInstantLineValues(chipNumber: number, lineNumbers: Array<number>, values: Array<number>, { activeLow, consumer, callback }?: {
    activeLow?: boolean;
    consumer?: string;
    callback?: Function;
}): void;
/**
 * Get instant line value passing flags
 * @param {number} chipNumber - The chip number
 * @param {number} lineNumber - The line number
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The line number
 * @param {InstantFlags} options.flags - The flags to use for the operation
 * @returns {0|1} - The current value of the line
 */
export function getInstantLineValueFlags(chipNumber: number, lineNumber: number, { activeLow, consumer, flags }?: {
    activeLow?: boolean;
    consumer?: string;
    flags: InstantFlags;
}): 0 | 1;
/**
 * Set instant line value passing flags
 * @param {number} chipNumber  - The chip number
 * @param {number} lineNumber  - The line number
 * @param {0|1} value - The value to set the line to. Must be 0 or 1
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The line number
 * @param {function} [options.callback] - The callback function to call when the operation is complete
 * @param {InstantFlags} options.flags - The flags to use for the operation
 */
export function setInstantLineValueFlags(chipNumber: number, lineNumber: number, value: 0 | 1, { activeLow, consumer, callback, flags }?: {
    activeLow?: boolean;
    consumer?: string;
    callback?: Function;
    flags: InstantFlags;
}): any;
/**
 * Get instant line values flags
 * @param {number} chipNumber - The chip number
 * @param {Array<number>} lineNumbers - An array of line numbers
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The consumer name
 * @param {InstantFlags} options.flags - The flags to use for the operation
 * @returns {Array<number>} - An array of current values for the lines
 */
export function getInstantLineValuesFlags(chipNumber: number, lineNumbers: Array<number>, { activeLow, consumer, flags }?: {
    activeLow?: boolean;
    consumer?: string;
    flags: InstantFlags;
}): Array<number>;
/**
 * Set instant line values passing flags
 * @param {number} chipNumber - The chip number
 * @param {Array<number>} lineNumbers - An array of line numbers
 * @param {Array<number>} values - An array of values to set the lines to. Must be 0 or 1
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.activeLow] - the logical active state for this ping, default is false (active high)
 * @param {string} [options.consumer] - The consumer name
 * @param {function} [options.callback] - The callback function to call when the operation is complete
 * @param {InstantFlags} options.flags - The flags to use for the operation
 */
export function setInstantLineValuesFlags(chipNumber: number, lineNumbers: Array<number>, values: Array<number>, { activeLow, consumer, callback, flags }?: {
    activeLow?: boolean;
    consumer?: string;
    callback?: Function;
    flags: InstantFlags;
}): void;
//# sourceMappingURL=misc.d.ts.map