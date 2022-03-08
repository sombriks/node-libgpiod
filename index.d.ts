declare class Chip {
  constructor(chipNumber: number);
  constructor(deviceNameOrPath: string);
}

declare class Line {
  constructor(chip: Chip, offset: number);

  getValue(): number;

  setValue(value: number): void;

  release(): void;

  requestOutputMode(defaultValue?: 0 | 1, consumer?: string): void;

  requestInputMode(consumer?: string): void;
}
