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
* @returns {number} - The current value of the line
*/
export function getInstantLineValue(chipNumber: number, lineNumber: number): number;
/**
* Set instant line value
* @param {number} chipNumber  - The chip number
* @param {number} lineNumber  - The line number
* @param {0|1} value - The value to set the line to. Must be 0 or 1
*/
export function setInstantLineValue(chipNumber: number, lineNumber: number, value: 0 | 1): any;
// # sourceMappingURL=misc.d.ts.map
