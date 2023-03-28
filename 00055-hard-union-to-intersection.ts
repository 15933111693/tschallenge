// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];

// ============= Your Code Here =============
type UnionToIntersection<T> = (T extends never ? never : (arg: T) => unknown) extends (arg: infer U) => unknown ? U : never;