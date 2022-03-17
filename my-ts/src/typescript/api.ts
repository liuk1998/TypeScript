/*
 * @Author: your name
 * @Date: 2022-03-09 10:35:05
 * @LastEditTime: 2022-03-17 16:57:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/typescript/api.ts
 */
// ! typescript 基础

// todo js八种类型 (基本类型 7 种， 引用类型 1 种)
let str: string = '刘可';
let num: number = 0;
let bool: boolean = false;
let n: null; // * 如果你在 tsconfig.json 指定了 "strictNullChecks":true ，null 和 undefined 只能赋值给 void 和它们各自的类型。
let u: undefined; // * 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给其他类型。
let sym: symbol = Symbol('刘可');
let big: bigint = 100n; // * 虽然 number 和 bigint 都表示数字，但是这两个类型不兼容。
let obj: object = {};



// todo 其他类型
// ? 数组
let arrStr: string[] = ['刘可', '刘寅', '刘一沫', '刘馨阳']; // * 定义有两种方式
let arrNum: Array<number> = [0, 1, 2];
let unionArr1: (string | number)[] = [0, '1', 2, '3']; // * 定义联合类型
let unionArr2: Array<string | number> = [0, '1', 2, '3'];
// // ---------------------------------------------------------------------------------
interface nameInter {
  name: string
};
let nameArr: nameInter[] = [{ 'name': '刘可' }]; // * 定义指定对象成员的数组
// // ---------------------------------------------------------------------------------
type ageType = {
  age: number
};
let ageArr: Array<ageType> = [{ 'age': 24 }]; // * 定义指定对象成员的数组
// // ---------------------------------------------------------------------------------


// ? 函数
function count1(x: number, y: number): number { // * 函数声明
  return x + y;
};
let count2 = (x: number, y: number) => x + y; // * 函数表达式
let count3 = (person: ageType) => person.age; // * 用接口定义函数类型
// // ---------------------------------------------------------------------------------
let infoFunc = (name: string, age?: number, sex: string = '男') => { // * ？为可选参数。可选参数后面不允许再出现必需参数。 = 为参数默认值。
  age && console.log(`我的名字是${name}, 我的年龄是${age}, 我的性别是${sex}`);
};
infoFunc('刘可', 24); // 我的名字是刘可, 我的年龄是24, 我的性别是男
// // ---------------------------------------------------------------------------------
function objFunc(arr: number[], ...items: number[]) { // * 剩余参数(扩展运算符将一个数组转为用逗号分隔的参数序列)
  items.forEach((itm: number) => {
    arr.push(itm);
  });
  console.log(arr); // [1, 2, 3]
};
objFunc([], 1, 2, 3);


// ? 元组
let tuple1: [string, number, boolean?] = ['1', 2]; // * 元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。类型必须匹配且个数必须为2(boolean为可选)
let [num1, num2] = tuple1; // * 元组类型的解构赋值
let tuple2: [string, ...number[]] = ['1', 0, 1, 2]; // * 元组类型的剩余元素
const tuple3: readonly [string, number] = ['0', 1]; // * 只读的元组类型


// ? 枚举
enum Months { Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nav, Dec };
console.log(Months.Feb === 1); // true  // * 声明一个枚举类型，如果没有赋值，它们的值默认为数字类型且从 0 开始累加。如果有赋值，后续的属性值依次累加。
// // ---------------------------------------------------------------------------------
enum Size { big = '大', medium = '中', smell = '小' };
console.log(Size.big === Size['big']); // true  // * 两种取值方法


// ? void
let vid: void; // * void表示没有任何类型，和其他类型是平等关系，不能直接赋值。方法没有返回值将得到undefined，但是我们需要定义成void类型，而不是undefined类型。


// ? never
function Type() {
  let num3: number = 10;
  try {
    if (num3 > 1) throw new Error('弹出错误'); // * never类型表示的是那些永不存在的值的类型(抛出异常、死循环)。
  } catch (err) {
    console.error(err);
  };
};
Type();


// ? any
let k: any; // * 等价于 let k; 在 TypeScript 中，任何类型都可以被归为 any 类型。缺点：无法使用 TypeScript 提供的大量的保护机制。


// ? unknown
let ko: unknown = '4';  // * unknown与any一样，所有类型都可以分配给unknown。
let c: string = ko;  // * unknown与any的最大区别是： 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any。


// ? Number、String、Boolean、Symbol
let num4: number = 2;  // * 原始类型
let Num1: Number = 4;  // * 相应原始类型的包装对象。
Num1 = num4;
num4 = Num1;  // * 不能将类型“Number”分配给类型“number”。“number”是基元，但“Number”是包装器对象。


// ? object、Object、{}
let obj1: object;  // * 代表的是所有非原始类型。不能把 number、string、boolean、symbol等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。
obj1 = 1;
obj1 = null;
obj1 = {};
// // ---------------------------------------------------------------------------------
let Obj1: Object;  // * 代表所有拥有 toString、hasOwnProperty 方法(返回一个布尔值，指示对象自身属性中是否具有指定的属性)的类型，所以所有原始类型、非原始类型都可以赋给 Object。同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。
Obj1 = 1;
Obj1 = null;
Obj1 = {};
let Obj2: {};  // * {}空对象类型和大 Object 一样。



// todo 类型断言
let strVal: any = 'I am LiuKe';
let strValLength1: number = (strVal as string).length; // * 两种语法
let strValLength2: number = (<string>strVal).length;
// // ---------------------------------------------------------------------------------
// ? 确定赋值断言
let x1!: number; // * 允许在实例属性和变量声明后面放置一个 ! 号，告诉 TypeScript 该属性会被明确地赋值。
let x2: number = x1 * 2;



// todo 字面量类型
const v1 = '刘可'; // * v1: '刘可'
const v2 = <const>1; // * v2: 1
const v3 = true; // * v3: true
// // ---------------------------------------------------------------------------------
let s1 = '刘可'; // * s1: string
let s2 = 1; // * s2: number
let s3 = true; // * s3: boolean
// // ---------------------------------------------------------------------------------
// ? 特殊情况
const objV = { literalA: v1, literalB: v2 };
objV.literalA; // * literalA: string  建立了一个对象，literalA 赋值为 v1 这个字符串，输出，objV.literalA 的类型为 string
objV.literalB; // * literalB: 1       但是如果在字符串前面加上 <const> 修饰符，就得到了 字面量类型



// todo 联合类型
let b: string | number | boolean; // * 联合类型表示取值可以为多种类型中的一种，使用 | 分隔每个类型。



// todo 类型别名
type point = 1 | 2 | 3;
type charObj = { name: string };
type characters = string | string[];
let chinese: characters = '哈哈哈';



// todo 交叉类型
type Info = { name: string, age: number } & { sex: string }; // * 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性，使用 & 定义交叉类型。
const Me: Info = { name: '刘可', age: 24, sex: '男' }; // * 交叉类型真正的用武之地就是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型。



// todo 接口
interface Apple { // * 定义了一个接口 Apple，接着定义了一个变量 myProduct，它的类型是 Apple。这样，我们就约束了 myProduct 的形状必须和接口 Apple 一致。赋值的时候，变量的形状必须和接口的形状保持一致。
  iphone: string,
  computer: string,
  readonly ipad: string // * 只读属性
  watch?: string // * 可选属性
};
let myProduct: Apple = {
  iphone: 'iphoneXR',
  computer: 'MacBook Air',
  ipad: 'iPad Pro'
};
// // ---------------------------------------------------------------------------------
// ? 任意属性
interface NBA { // * 有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 索引签名 的形式来满足上述要求。
  name: string,
  star?: string[],
  [prop: string]: any // * 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。一个接口中只能定义一个任意属性。
};
const Lakers: NBA = {
  name: 'Los Angeles Lakers',
  star: ['Kobe Bryant', 'Lebron James'],
  years: 1947,
};



// todo 接口与类型别名的区别
type Name = string;  // * 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。
type Data = string | number;
type DataArr = [string, number];
type Myself = { name: string, age: number, sex: string };
// // ---------------------------------------------------------------------------------
interface Yourself {  // * 两者都可以用来描述对象或函数的类型。
  name: string,
  age: number,
  sex: string
}
interface Yourself { phone: number };  // * 与类型别名不同，接口可以定义多次，会被自动合并为单个接口。
const yourself: Yourself = { name: '刘可', age: 23, sex: '男', phone: 18342214686 };



// todo 泛型
function generic<T, U>(a: T, b: U): T { // * T , U 是抽象类型，只有在调用的时候才确定它的值
  console.log(a, b);
  return a;
};
generic('刘可在学习泛型', 1000000); // * 'ts编译器自动识别，不传尖括号'
// // ---------------------------------------------------------------------------------
// ? 泛型约束
interface Book {
  name: string
};
function printBook<T extends Book>(book: T): string {
  console.log(book.name);
  return book.name;
};
printBook({name: '十万个为什么'});



// todo 泛型工具类型
// ? typeof
interface Param {
  data: string
};
let value: Param = { data: '123456' };
type Value = typeof value; // type Value = Param  // * typeof 的主要用途是在类型上下文中获取变量或者属性的类型。
let value2: Value = { data: '110' };  // * 在上面代码中，我们通过 typeof 操作符获取 value 变量的类型并赋值给 Value 类型变量，之后我们就可以使用 Value 类型。


// ? keyof
interface Mouse {
  name: string,
  price: number
};
type mouse1 = keyof Mouse; // * 可以用于获取某种类型的所有键，其返回类型是联合类型。
let m: mouse1 = 'price'; // 'name' | 'price'
// // ---------------------------------------------------------------------------------
type mouse4 = keyof Mouse[];
const m1: mouse4 = 'reduce'  // 类型为数组方法
// // ---------------------------------------------------------------------------------
// ? keyof的作用
type To = {
  name: string,
  age: number,
  done: boolean
};
const to: To = { name: '刘可', age: 23, done: true };
// // ---------------------------------------------------------------------------------
function prop(obj: To, key: string) {
  // @ts-ignore 是告诉ts, 我不想让ts检查下面这行, ts就不会报错了.
  return obj[key]; // 报错： 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "{}"。在类型 "{}" 上找不到具有类型为 "string" 的参数的索引签名。ts(7053)
};
function prop1(obj: To, key: string) { // * 解决方案1 不推荐
  return (obj as any)[key];
};
function prop2(obj: To, key: string) { // * 解决方案2 推荐
  return obj[(key as keyof To)];
};
function prop3<T extends object, K extends keyof T>(obj: T, key: K) { // * 解决方案3 推荐
  return obj[key]; // * 首先定义了 T 类型并使用 extends 关键字约束该类型必须是 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，其返回类型是联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。
};
prop3(to, 'age');


// ? in
type Keys = 'a' | 'b' | 'c';  // * 用来遍历联合类型
type K = {
  [k in Keys] : any  // { a: any, b: any, c: any }
};


// ? infer
type wg = { skill: '爬行', name: '乌龟' };
type getName<T> = T extends { skill: '爬行', name: infer R } ? R : never; // * 取值
const n1: getName<wg> = '乌龟';



// todo 内置的工具类型
// ? Partial
type Partial_<T> = { // * 定义  将类型的属性变成可选。
  [P in keyof T]? : T[P] // * 首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值的类。中间的 ? 号，用于将所有属性变为可选。
};
interface UserInfo {
  name: string,
  age: number
};
type NewUserInfo = Partial_<UserInfo>;
const lk: NewUserInfo = { name: '刘可' };
// // ---------------------------------------------------------------------------------
interface My {  // * 但是 Partial<T> 有个局限性，就是只支持处理第一层的属性。解决：
  name: string,
  age: number,
  other: {
    sex: string
  }
};
type DeepPartial<T> = {
  [P in keyof T]? : T[P] extends object ? DeepPartial<T[P]> : T[P] // * 递归
};
type NewMy = DeepPartial<My>;
const my: NewMy = { other: {} };


// ? Required
type Required_<T> = {  // * 定义  将类型的属性变成必选。
  [P in keyof T]-? : T[P] // * 其中 -? 是代表移除 ?
};


// ? Readonly
type Readonly_<T> = {  // * 定义 将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。
  readonly [P in keyof T] : T[P]
};


// ? Exclude
type Exclude_<T, U> = T extends U ? never : T; // * 定义  将某个类型中属于另一个的类型移除掉。
type T0 = Exclude_<'a' | 'b' | 'c', 'a'>; // "b" | "c"
type T1 = Exclude_<1 | 'b' | true, 1>; // true | "b"


// ? Extract
type Extract_<T, U> = T extends U ? U : never; // * 定义  作用是从 U 中提取出 T。
type E0 = Extract_<'a' | 'b' | 'c', 'a'>; // E0 = "a"


// ? Pick
type Pick_<T, K extends keyof T> = { // * 定义  从某个类型中挑出一些属性出来。 先约束 K 为 T 的键值(此时为联合类型)，然后 P 遍历联合类型。
  [P in K] : T[P]
};
interface Do {
  title: string,
  todo: string,
  completed: boolean
};
type NewDo = Pick_<Do, 'title' | 'todo'>;
const do1: NewDo = { title: 'Pick', todo: '从某个类型中挑出一些属性出来' };


// ? Omit
type Omit_<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>; // * 定义 使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型。
interface O1 {
  title: string,
  id: number,
  completed: boolean
};
type O2 = Omit_<O1, 'id'>; // { title: string, completed: boolean }
const O3: O2 = { title: '刘可', completed: true };


// ? Record
type Record_<K extends keyof any, T> = { // * 定义  将 K 中所有的属性的值转化为 T 类型。
  [P in K] : T
};
interface Page {
  name: string;
};
type PageInfo = '刘可' | '刘寅';
const name2: Record_<PageInfo, Page> = {
  '刘可': {name: 'a'},
  '刘寅': {name: 'b'}
};


// ? ReturnType
type ReturnType_<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;  // * 定义  用来得到一个函数的返回值类型。
type Func = (value: number) => string;
const foo: ReturnType_<Func> = '1'; // * ReturnType获取到 Func 的返回值类型为 string，所以，foo 也就只能被赋值为字符串了。


// ? NonNullable
type NonNullable_<T> = T extends null | undefined ? never : T;  // * 定义  用来过滤类型中的 null 及 undefined 类型。
type N0 = NonNullable_<string | number | undefined>; // string | number



// ! tsconfig.json
// todo 重要字段
// * files - 设置要编译的文件的名称；
// * include - 设置需要进行编译的文件，支持路径模式匹配；
// * exclude - 设置无需进行编译的文件，支持路径模式匹配；
// * compilerOptions - 设置与编译流程相关的选项。

// todo compilerOptions 选项
const compilerOptions = {
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
};