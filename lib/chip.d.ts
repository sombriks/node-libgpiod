/**
 * @class Chip
 * @description Class to handle the chip
 */
import {type Line} from './line.js';

export class Chip {
	/**
   * @constructor
   * @param {number|string} identifier - The chip identifier
   */
	constructor(identifier: number | string);
	_handler: any;
	/**
   * @description Get the chip name
   * @returns {string} The chip name
   */
	get name(): string;
	/**
   * @description Get the label of the chip
   * @returns {string} The label of the chip
   */
	get label(): string;
	/**
   * @description Get the number of lines in the chip
   * @returns {number} The number of lines in the chip
   */
	get numberOfLines(): number;
	/**
   * @description Get the names of lines in the chip
   * @returns {string[]} The line names from the chip
   */
	get lineNames(): string[];
	/**
   * Get a line instance from this chip
   * @param {number|string} identifier
   * @returns {Line} line instance
   */
	getLine(identifier: number | string): Line;
}
// # sourceMappingURL=chip.d.ts.map
