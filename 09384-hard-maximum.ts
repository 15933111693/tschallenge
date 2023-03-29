// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>
];

// ============= Your Code Here =============
type Gen<T extends number, Arr extends unknown[] = []> = Arr["length"] extends T
  ? Arr
  : Gen<T, [...Arr, 0]>;
type Max<
  A extends number,
  B extends number,
  Arr extends unknown[] = []
> = Arr["length"] extends A
  ? B
  : Arr["length"] extends B
  ? A
  : Max<A, B, [...Arr, 0]>;
type Maximum<
  T extends number[],
  Res extends number = never,
  Flag = false
> = T extends [infer F extends number, ...infer R extends number[]]
  ? Flag extends true
    ? Maximum<R, Max<Res, F>, true>
    : Maximum<R, F, true>
  : Res;
