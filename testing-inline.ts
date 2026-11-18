export function factorial(n: number): number {
  if (n < 0) throw new Error("factorial is not defined for negative numbers");
  if (n === 0) return 1;
  let result = 1;   
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}   

const result = factorial(5);
console.log(`Factorial of 5 is: ${result}`); // Output: Factorial of 5 is: 120