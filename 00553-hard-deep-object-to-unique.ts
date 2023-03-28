// ============= Test Cases =============
import type { Equal, IsFalse, IsTrue } from './test-utils'

type Quz = { quz: 4 }

type Foo = { foo: 2; baz: Quz; bar: Quz }
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } }

type UniqQuz = DeepObjectToUniq<Quz>
type UniqFoo = DeepObjectToUniq<Foo>
type UniqBar = DeepObjectToUniq<Bar>

declare let foo: Foo
declare let uniqFoo: UniqFoo

uniqFoo = foo
foo = uniqFoo

type cases = [
  IsFalse<Equal<UniqQuz, Quz>>,
  IsFalse<Equal<UniqFoo, Foo>>,
  IsTrue<Equal<UniqFoo['foo'], Foo['foo']>>,
  IsTrue<Equal<UniqFoo['bar']['quz'], Foo['bar']['quz']>>,
  IsFalse<Equal<UniqQuz, UniqFoo['baz']>>,
  IsFalse<Equal<UniqFoo['bar'], UniqFoo['baz']>>,
  IsFalse<Equal<UniqBar['baz'], UniqFoo['baz']>>,
  IsTrue<Equal<keyof UniqBar['baz'], keyof UniqFoo['baz']>>,
  IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>,
]


// ============= Your Code Here =============
type DeepObjectToUniq<O extends object, _UniqFlag extends [PropertyKey?, object?] = []> =
  { [P in keyof O]: O[P] extends object ? DeepObjectToUniq<O[P], [P, O]> : O[P] }
  & { [flag: symbol]: _UniqFlag }   //为结构体打上独特的标志[字段名, 拥有者]
