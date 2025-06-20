export const InstantFlags: InstantFlags;
export const version: string;
/**
* Get the names of all available chips
* @returns {Array<string>} - An array of chip names
*/
export function getChipNames(): string[];
/**
* Get instant line value
* @param {number} chipNumber - The chip number
* @param {number} lineNumber - The line number
* @param {boolean} [activeLow] - the logical active state for this ping, default is false (active high)
* @param {string} [consumer] - The line number
* @returns {0|1} - The current value of the line
*/
export function getInstantLineValue(chipNumber: number, lineNumber: number, activeLow?: boolean, consumer?: string): 0 | 1;
/**
* Set instant line value
* @param {number} chipNumber  - The chip number
* @param {number} lineNumber  - The line number
* @param {0|1} value - The value to set the line to. Must be 0 or 1
* @param {boolean} [activeLow] - the logical active state for this ping, default is false (active high)
* @param {string} [consumer] - The line number
* @param {function} [callback] - The callback function to call when the operation is complete
*/
export function setInstantLineValue(chipNumber: number, lineNumber: number, value: 0 | 1, activeLow?: boolean, consumer?: string, callback?: Function): any;
// # sourceMappingURL=misc.d.ts.map
