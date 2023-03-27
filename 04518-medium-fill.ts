// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

// ============= Your Code Here =============
// type Gen<T extends number, Ans extends any[] = []> = T extends Ans["length"]
//   ? Ans
//   : Gen<T, [...Ans, 0]>;
// type Plus<T extends number> = [...Gen<T>, 0]["length"];
// type Fill<
//   T extends unknown[],
//   N,
//   Start extends number = 0,
//   End extends number = T["length"],
//   Ans extends any[] = []
// > = T extends [infer F, ...infer R]
//   ? Start extends End
//     ? Fill<R, N, Start, End, [...Ans, F]>
//     : Ans["length"] extends Start
//     ? Fill<R, N, Plus<Start>, End, [...Ans, N]>
//     : Fill<R, N, Start, End, [...Ans, F]>
//   : Ans;

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Ans extends any[] = [],
  Flag extends boolean = false
> = T extends [infer F, ...infer R]
  ? Ans["length"] extends End
    ? [...Ans, ...T]
    : Ans["length"] extends Start
    ? Fill<R, N, Start, End, [...Ans, N], true>
    : Fill<R, N, Start, End, [...Ans, Flag extends true ? N : F], Flag>
  : Ans;
