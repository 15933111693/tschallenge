// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
type IsFalse<T> = T extends Record<string, never> | [] | '' | 0 | null | undefined | false ? true : false
type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? IsFalse<F> extends true
    ? AnyOf<R>
    : true
  : false;
