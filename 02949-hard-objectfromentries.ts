// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];

// ============= Your Code Here =============
type Merge<T> = {
  [K in keyof T]: T[K];
};
type UnionToIntersection<T> = (
  T extends T ? (arg: T) => unknown : never
) extends (arg: infer F) => unknown
  ? F
  : never;
type ObjectFromEntries<T> = Merge<
  UnionToIntersection<
    T extends T
      ? T extends [infer F extends string, infer R]
        ? { [K in F]: R }
        : never
      : never
  >
>;
