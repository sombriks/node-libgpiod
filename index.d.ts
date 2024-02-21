declare module "node-libgpiod" {
  /**
   * Chip instances represent GPIO chips (each with a fixed number of
   * GPIO lines) on the Linux host. The number of GPIO chips depends on
   * the hardware available.
   */
  declare class Chip {
    /**
     * Constructs a new Chip instance by its chip number.
     *
     * @param chipNumber the number of the GPIO chip
     * @throws error if the chip cannot be opened
     */
    constructor(chipNumber: number);
  
    /**
     * Constructs a new Chip instance by its device name or full device path.
     *
     * @param deviceNameOrPath the device name or full device path of the GPIO chip
     * @throws error if the chip cannot be opened
     */
    constructor(deviceNameOrPath: string);
  
    /**
     * Returns the number of GPIO lines available (reserved or not) on the GPIO chip.
     */
    getNumberOfLines(): number
  
    /**
     * Returns the GPIO chip name as represented by the kernel.
     */
    getChipName(): string
  
    /**
     * Returns the GPIO chip label as represented by the kernel.
     */
    getChipLabel(): string
  }
  
  /**
   * Line instances represent direct access to a specific GPIO line on
   * the Linux host. Those lines can be reserved as input or output.
   */
  declare class Line {
  
    /**
     * Constructs a new Line instance for the given chip and line offset.
     *
     * @param chip the parent gpio chip
     * @param offset the line offset
     * @throws error if the line cannot be opened
     */
    constructor(chip: Chip, offset: number);
  
    /**
     * Returns the line offset of this Line instance for the assigned GPIO chip.
     *
     * @throws error if the line offset cannot be read
     */
    getLineOffset(): number;
  
    /**
     * Returns the line name as represented by the kernel. The name is either a
     * valid string, or undefined if not set.
     *
     * @throws error if the line name cannot be read
     */
    getLineName(): string | undefined;
  
    /**
     * Returns the line consumer as represented by the kernel. This consumer is
     * either a valid string, or undefined if not set.
     *
     * @throws error if the line consumer cannot be read
     */
    getLineConsumer(): string | undefined;
  
    /**
     * Returns the state value of the line as off (0) or on (1).
     * @throws error if the line is not reserved
     */
    getValue(): 0 | 1;
  
    /**
     * Sets the state of the line to either on or off. Setting the same state as
     * current, nothing happens.
     *
     * @param value the new state of the output line (0 = off, 1 = on)
     * @throws error if the line is not reserved as an output
     */
    setValue(value: 0 | 1): void;
  
    /**
     * Releases a previously created reservation. If the line is not reserved at
     * the time of calling this method, nothing happens.
     */
    release(): void;
  
    /**
     * Reserves the current line as an output. It is possible to pass a defaultValue,
     * which defines the base state of the line (off or on). If not given, the default
     * state is off.
     *
     * In addition, a consumer name can be given to assign a name to the reservation.
     *
     * @param defaultValue an optional default value (0 = off, 1 = on)
     * @param consumer an optional consumer name to assign to the reservation
     * @throws error if the line is already reserved
     */
    requestOutputMode(defaultValue?: 0 | 1, consumer?: string): void;
  
    /**
     * Reserves the current line as an input.
     *
     * A consumer name can be given to assign a name to the reservation.
     *
     * @param consumer an optional consumer name to assign to the reservation
     * @throws error if the line is already reserved
     */
    requestInputMode(consumer?: string): void;

    /**
     * Reserves the current line as an input with Flags.
     *
     * A consumer name can be given to assign a name to the reservation.
     *
     * @param consumer an optional consumer name to assign to the reservation
     * @param flags GPIOD_LINE_REQUEST_FLAG_xxxx as defined in gpiod.h
     * @throws error if the line is already reserved
     */
    requestInputModeFlags(consumer?: string, flags?: number): void;
  }
  
  /**
   * Returns true if the libgpiod functionality is available in
   * the current execution environment, otherwise false (for example
   * in non-Linux development environments).
   */
  declare function available(): boolean;
}
