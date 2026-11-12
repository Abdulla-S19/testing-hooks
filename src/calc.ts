/** Multiplies all given numbers together. With no arguments, returns 1. */
export function multiply(...values: number[]): number {
  return values.reduce((product, v) => product * v, 1);
}

/** Divides `a` by `b`. Throws when `b` is 0. */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

/** Restricts `value` to the inclusive range [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
