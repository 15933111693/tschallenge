// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>
];

// ============= Your Code Here =============
type Check<
  T extends string,
  U extends string
> = T extends `${infer F}${infer R}`
  ? F extends U
    ? false
    : Check<R, U>
  : true;
type FirstUniqueCharIndex<
  T extends string,
  Ans extends string = '',
  Ans2 extends unknown[] = []
> = T extends `${infer F}${infer R}`
  ? Check<`${Ans}${R}`, F> extends true
    ? Ans2['length']
    : FirstUniqueCharIndex<R, `${Ans}${F}`, [...Ans2, 0]>
  : -1;
