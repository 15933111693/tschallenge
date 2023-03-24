// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]


// ============= Your Code Here =============
type Shift<T extends any[]> = T extends [infer F, ...infer R] ? R : [];
type Gen<N, Arr extends any[] = []> = Arr['length'] extends N ? Arr : Gen<N, [...Arr, 0]>;
type Sub<A extends any[], B extends any[]> = A['length'] extends 0 ? B['length'] extends 0 ? false : false : B['length'] extends 0 ? true : Sub<Shift<A>, Shift<B>>;
type GreaterThan<T extends number, U extends number> = Sub<Gen<T>, Gen<U>>;
