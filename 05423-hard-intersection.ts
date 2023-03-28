// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>
];

// ============= Your Code Here =============
type TupleToUnion<T> = T extends unknown[] ? T[number] : T;
type _Intersection<A, B> = A extends B ? A : never;
type Intersection<T extends unknown[], Ans = never, Flag = false> = T extends [
  infer F,
  ...infer R
]
  ? Flag extends false
    ? Intersection<R, TupleToUnion<F>, true>
    : Intersection<R, _Intersection<Ans, TupleToUnion<F>>, true>
  : Ans;
