// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a">, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b">, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b" | "a">, false>>
];

// ============= Your Code Here =============
// type IsRequiredKey<T, K extends keyof T> = T[K] extends Required<T>[K] ? true : false;

type GetOptionalKey<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};
type IS<A, B> = [A extends B ? A : never] extends [never] ? false : true;
type IsRequiredKey<T, K extends keyof T, U = GetOptionalKey<T>> = IS<
  K,
  U
> extends true
  ? false
  : true;
