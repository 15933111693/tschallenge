// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from "./test-utils";

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>;
    type cases = [
      Expect<IsAny<PropsType["propA"]>>,
      Expect<Equal<PropsType["propB"], string>>,
      Expect<Equal<PropsType["propC"], boolean>>,
      Expect<Equal<PropsType["propD"], ClassA>>,
      Expect<Equal<PropsType["propE"], string | number>>,
      Expect<Equal<PropsType["propF"], RegExp>>
    ];

    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const propE = this.propE;
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ];
    },
  },
});

// ============= Your Code Here =============
type ArrayToBase<T> = T extends unknown[] ? ToBase<T[number]> : ToBase<T>;
type ToBase<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : T extends RegExpConstructor
  ? RegExp
  : T extends new (...args: any[]) => infer R
  ? R
  : T;

type ParseProps<T> = ToBase<{
  [K in keyof T]: {} extends T[K] ? any : 'type' extends keyof T[K] ? ArrayToBase<T[K]['type']> : ArrayToBase<T[K]>;
}>;
declare function VueBasicProps<
  P extends { [key: string]: unknown | { type: unknown } },
  D extends { [key: string]: unknown },
  C extends { [key: PropertyKey]: unknown },
  M extends { [key: PropertyKey]: () => unknown }
>(
  options: {
    props: P;
    data: (this: ParseProps<P>) => D;
    computed: C & ThisType<D>;
    methods: M &
      ThisType<
        M &
          D & {
            [K in keyof C]: C[K] extends () => infer RT ? RT : never;
          } & ParseProps<P>
      >;
  } & ThisType<never>
): any;
