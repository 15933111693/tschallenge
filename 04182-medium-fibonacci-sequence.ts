// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type Gen<N, Arr extends any[] = []> = Arr["length"] extends N
  ? Arr
  : Gen<N, [...Arr, 0]>;
type Sub<A extends any[], B extends any[]> = [...A, ...B]["length"];
type Fibonacci<T extends number, Cur = 2, f1 = 1, f2 = 1> = T extends 1 | 2
  ? 1
  : T extends Cur
  ? f2
  : Fibonacci<T, Sub<Gen<Cur>, Gen<1>>, f2, Sub<Gen<f1>, Gen<f2>>>;
