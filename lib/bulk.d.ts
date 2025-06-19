/**
 * @class Bulk
 * @description Class to handle bulk operations on the chip lines
 */
export class Bulk {
    /**
     * @constructor
     * @param {Chip} chip - The chip to request the line bulk
     * @param {Number[]|String[]} [lines] which lines to request from the chip.
     * Either pass the names or the pin numbers. If no list is passed, or the list
     * is empty, all lines from the chip will be requested.
     */
    constructor(chip: Chip, lines?: number[] | string[]);
    _handler: any;
    /**
     * @property {number[]} values - get current values of the lines in the bulk.
     */
    get values(): any;
    /**
     * @method setValues
     * @description Set values for the lines in the bulk.
     * @param {number[]} values - An array of values to set for each line in the bulk.
     * The length of the array must match the number of lines in the bulk.
     * Number values must be either 0 or 1.
     */
    setValues(values: number[]): any;
    /**
     * Request input mode for all lines in the bulk.
     * @param {string} [consumers] - Consumer names for the request.
     */
    requestInputMode(consumers?: string): any;
    /**
     * Request output mode for all lines in the bulk.
     * @param {string} [consumers] - Consumer names for the request.
     * @param {number[]} [defaultValues] default values for the output lines.
     */
    requestOutputMode(consumers?: string, defaultValues?: number[]): any;
    /**
     * Request rising edge events for all lines in the bulk.
     * @param {string} [consumer] - Consumer name for the request.
     */
    requestRisingEdgeEvents(consumer?: string): any;
    /**
     * Request falling edge events for all lines in the bulk.
     * @param {string} [consumer] - Consumer name for the request.
     */
    requestFallingEdgeEvents(consumer?: string): any;
    /**
     * Request both edges events for all lines in the bulk.
     * @param {string} [consumer] - Consumer name for the request.
     */
    requestBothEdgesEvents(consumer?: string): any;
    /**
     * Set the direction of all lines in the bulk to input.
     */
    setDirectionInput(): void;
    /**
     * Set the direction of all lines in the bulk to output.
     * @param {number[]} [values] - An array of values to set for each line in the bulk.
     * The length of the array must match the number of lines in the bulk.
     * Number values must be either 0 or 1.
     */
    setDirectionOutput(values?: number[]): void;
    /**
     * Release a previously requested bulk
     */
    release(): void;
}
import { Chip } from "./chip";
//# sourceMappingURL=bulk.d.ts.map