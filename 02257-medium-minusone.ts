// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============
// type Gen<N extends number, Arr extends any[] = []> = Arr['length'] extends N ? Arr : Gen<N, [...Arr, 0]>;
// type MinusOne<T extends number, A extends any[] = Gen<T>> = A extends [infer F, ...infer R] ? R['length'] : 0;
type c;
