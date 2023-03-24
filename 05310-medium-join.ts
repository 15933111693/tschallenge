// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
  Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
  Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
  Expect<Equal<Join<["o"], "u">, "o">>
];

// ============= Your Code Here =============
type Join<T, U> = T extends [infer F]
  ? `${F}`
  : T extends [infer F, ...infer R]
  ? `${F}${U}${Join<R, U>}`
  : never;
