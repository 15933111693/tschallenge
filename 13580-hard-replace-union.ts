// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<
    Equal<
      UnionReplace<
        Function | Date | object,
        [[Date, string], [Function, undefined]]
      >,
      undefined | string | object
    >
  >
];

// ============= Your Code Here =============
type Change<T, U> = U extends [infer F, ...infer R]
  ? F extends [infer F2, infer R2]
    ? T extends F2
      ? R2
      : Change<T, R>
    : Change<T, R>
  : T;
type UnionReplace<T, U extends [any, any][]> = T extends T
  ? Change<T, U>
  : never;

