/** Adds two numbers and returns the sum. */
export function add(a: number, b: number): number {
  return a + b;
}

/** Multiplies two numbers and returns the product. */
export function multiply(a: number, b: number): number {
  return a * b;
}

/** Divides a by b and returns the quotient. Throws if b is 0. */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}
