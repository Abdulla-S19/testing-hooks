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

/** Raises base to the power of exp and returns the result. */
export function power(base: number, exp: number): number {
  return base ** exp;
}

/** Returns the square root of a. Throws if a is negative. */
export function squareRoot(a: number): number {
  if (a < 0) {
    throw new Error("Square root of negative number");
  }
  return Math.sqrt(a);
}
