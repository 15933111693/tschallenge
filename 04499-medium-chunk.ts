// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
type Chunk<
  T extends any[],
  U,
  S extends any[] = [],
  Ans extends any[] = []
> = T extends [infer F, ...infer R]
  ? Equal<[F, ...S]["length"], U> extends true
    ? Chunk<R, U, [], [...Ans, [...S, F]]>
    : Chunk<R, U, [...S, F], Ans>
  : S['length'] extends 0 ? Ans : [...Ans, S]
