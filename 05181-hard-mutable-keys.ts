// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, "a">>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, "a">>,
  Expect<
    Equal<
      MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<MutableKeys<{}>, never>>
];

// ============= Your Code Here =============
type MutableKeys<T, K extends keyof T = keyof T> = K extends K
  ? Equal<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }> extends true
    ? K
    : never
  : never;
