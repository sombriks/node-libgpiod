declare class Chip {
  constructor(chipNumber: number);
  constructor(deviceNameOrPath: string);
}

declare class Line {
  constructor(chip: Chip, offset: number);

  getValue(): number;

  setValue(value: number): void;

  release(): void;

  requestOutputMode(defaultValue?: number, consumer?: string): void;

  requestInputMode(consumer?: string): void;
}
