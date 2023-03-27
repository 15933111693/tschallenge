// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

// ============= Your Code Here =============
type Shift<T extends unknown[]> = T extends [infer F, ...infer R]
  ? [F, R]
  : never;
type Zip<T extends any[], U extends any[]> = Shift<T> extends never
  ? []
  : Shift<U> extends never
  ? []
  : Shift<T> extends [infer F, infer R]
  ? Shift<U> extends [infer F1, infer R2]
    ? [
        [F, F1],
        ...(R extends unknown[] ? (R2 extends unknown[] ? Zip<R, R2> : []) : [])
      ]
    : []
  : [];
