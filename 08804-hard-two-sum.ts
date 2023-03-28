// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

// ============= Your Code Here =============
type Gen<T extends number, Arr extends unknown[] = []> = Arr["length"] extends T
  ? Arr
  : Gen<T, [...Arr, 0]>;
type Add<A extends unknown[], B extends unknown[]> = [...A, ...B]["length"];
type Check<
  T extends number,
  Arr extends number[],
  U extends number
> = Arr extends [infer F extends number, ...infer R extends number[]]
  ? Add<Gen<F>, Gen<T>> extends U
    ? true
    : Check<T, R, U>
  : false;
type TwoSum<T extends number[], U extends number> = T extends [
  infer F extends number,
  ...infer R extends number[]
]
  ? Check<F, R, U> extends true
    ? true
    : TwoSum<R, U>
  : false;
