// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Combination<["foo", "bar", "baz"]>,
      | "foo"
      | "bar"
      | "baz"
      | "foo bar"
      | "foo bar baz"
      | "foo baz"
      | "foo baz bar"
      | "bar foo"
      | "bar foo baz"
      | "bar baz"
      | "bar baz foo"
      | "baz foo"
      | "baz foo bar"
      | "baz bar"
      | "baz bar foo"
    >
  >
];

// ============= Your Code Here =============
type Combination<T extends string[], U = T[number], U1 = U> = U extends string
  ? `${U} ${Combination<[], Exclude<U1, U>>}` | `${U}`
  : never;

type Combination2<T extends string[], U extends string = T[number], U1 extends string = U> = [
  U
] extends [never]
  ? ""
  : U extends U
  ? `${U} ${Combination2<[], Exclude<U1, U>>}`
  : "";
type c = Combination2<["foo", "bar", "baz"]>;
