// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

SimpleVue({
  data() {
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
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});

// ============= Your Code Here =============
declare function SimpleVue<
  D extends { [key: string]: unknown },
  C extends { [key: PropertyKey]: unknown },
  M extends { [key: PropertyKey]: () => unknown }
>(
  options: {
    data: () => D;
    computed: C & ThisType<D>;
    methods: M &
      ThisType<
        M & D & { [K in keyof C]: C[K] extends () => infer RT ? RT : never }
      >;
  } & ThisType<never>
): any;
