// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

// ============= Your Code Here =============
type Flat<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? [...F, ...Flat<R>]
    : [F, ...Flat<R>]
  : T;
type FlattenDepth<
  T extends any[],
  D extends number = 1,
  Arr extends unknown[] = []
> = Arr["length"] extends D
  ? T
  : Flat<T> extends T
  ? T
  : FlattenDepth<Flat<T>, D, [...Arr, unknown]>;
