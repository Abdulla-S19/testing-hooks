/** Adds two numbers and returns the sum. */
export function add(a: number, b: number): number {
  return a + b;
}

/** Returns the square of a number. */
export function sq(a: number): number {
  return a * a;
}

/** Returns the cube of a number (a * a * a). */
export function cube(a: number): number {
  return a * a * a;
}

/** Returns a new array with the cube of each number in `values`. */
export function cubeAll(values: number[]): number[] {
  return values.map(cube);
}

export function square(a:number) : number {
return a * a
}

export function squareAll(values:number[]) : number[]{
return values.map((v)=>square(v));
}

export function roundPayment(amount:number):number{
return Math.round(amount *100) / 100;
}

/**
 * Multiplies all numbers in `values` together and returns the product.
 * An empty array returns 1 (the multiplicative identity).
 */
export function multiplyAll(values: number[]): number {
  return values.reduce((product, v) => product * v, 1);
}

export function safeDvivide(a:number , b:number) : number{
if (b === 0) throw new Error("cannot divide by zero");
return a / b;
}

export function roundRefund(amount: number): number {
  return Math.floor(amount * 100) / 100;
}

/**
 * Returns true when the login should be blocked, i.e. when the number of
 * failed attempts has reached or exceeded the allowed maximum.
 */
export function isLoginBlocked(failedAttempts: number, maxAttempts: number): boolean {
  return failedAttempts >= maxAttempts;
}

/**
 * Returns true when a session has expired, i.e. when strictly more than
 * `timeoutMinutes` have elapsed between `lastActiveMs` and `nowMs`.
 * Both timestamps are in milliseconds. Exactly `timeoutMinutes` is not expired.
 */
export function isSessionExpired(lastActiveMs: number, nowMs: number, timeoutMinutes: number): boolean {
  return nowMs - lastActiveMs > timeoutMinutes * 60 * 1000;
}

export function isPasswordLongEnough(password: string): boolean {
  return password.length >= 12;
}