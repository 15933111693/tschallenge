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
  T extends { [key: PropertyKey]: unknown },
  U extends { [key: string]: () => unknown },
  V extends { [key: string]: () => unknown }
>(options: {
  data: () => T;
  computed: U & ThisType<T>;
  methods: V & ThisType<T & V & { [K in keyof U]: U[K] extends () => infer R ? R : never }>;
} & ThisType<never>): any;
