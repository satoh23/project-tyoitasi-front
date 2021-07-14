import React from "react";

const name = "gasd";

let userName: string = "John";
let dummyNum: number = 2;
let bool: boolean = true;
let list: number[] = [1, 2];
let list2: (string | number)[] = [1, "ags"];

interface TEST {
  test: string;
  test2?: string | null;
}

let test: TEST = { test: "asg", test2: "gas" };
let test2: TEST = { test: "fa", test2: null };
let test3: TEST = { test: "fa" };

const func1 = (x: number, y: number): number => {
  return x + y;
};

type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  userName: string;
  password: string;
};

type USER = PROFILE & LOGIN;

let value: boolean | number;
value = true;
value = 10;

let arrayUni: (number | string)[];
arrayUni = [1, 3, "fgaf"];

const user: USER = {
  age: 12,
  city: "japan",
  userName: "john",
  password: "test",
};

let company: "Facebook" | "Google" | "Amazon";
company = "Facebook";

let memory: 1 | 10 | 100;
memory = 10;

let message: string = "Hello";
let msg2: typeof message;

enum OS {
  Windows,
  Mac,
  Linux,
}
interface PC {
  id: number;
  OSType: OS;
}

const PC1: PC = {
  id: 1,
  OSType: OS.Linux,
};

const comp1 = "test";
let comp2: string = comp1;

let comp3: string = "test";
let comp4: "test" = "test";

interface GEN<T> {
  item: T;
}
const gen0: GEN<string> = { item: "hello" };
const gen1: GEN<number> = { item: 10 };

interface GEN1<T = string> {
  item: T;
}
const gen2: GEN1 = { item: "hello" };

interface GEN2<T extends string | number> {
  item: T;
}
const gen3: GEN2<string> = { item: "hello" };

function funcGen<T>(props: T) {
  return { item: props };
}
const gen6 = funcGen("test");

function funcGen1<T extends string | null>(props: T) {
  return { item: props };
}
const gen8 = funcGen("hello");

const Home: React.FC = () => <div>Hello Next.js!</div>;

export default Home;
