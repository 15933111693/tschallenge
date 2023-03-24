// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<BEM<"btn", ["price"], []>, "btn__price">>,
  Expect<
    Equal<
      BEM<"btn", ["price"], ["warning", "success"]>,
      "btn__price--warning" | "btn__price--success"
    >
  >,
  Expect<
    Equal<
      BEM<"btn", [], ["small", "medium", "large"]>,
      "btn--small" | "btn--medium" | "btn--large"
    >
  >
];

// ============= Your Code Here =============
type BEM<
  B extends string,
  E extends string[],
  M extends string[],
  E1 = E[number],
  M1 = M[number]
> = `${B}${E["length"] extends 0
  ? ""
  : E1 extends E[number]
  ? `__${E1}`
  : ""}${M["length"] extends 0 ? "" : M1 extends M[number] ? `--${M1}` : ""}`;
