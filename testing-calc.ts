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