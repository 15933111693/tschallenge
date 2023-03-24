// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type Is<A, B> = B extends [infer F, ...infer R] ? Equal<A, F> extends true ? true : Is<A, R> : Equal<A, B> extends true ? true : false;
type Without<T, U> = T extends [infer F, ...infer R] ? Is<F, U> extends true ? [...Without<R, U>] : [F, ...Without<R, U>] : [];
