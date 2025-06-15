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
}
import { Chip } from "./chip";
//# sourceMappingURL=bulk.d.ts.map