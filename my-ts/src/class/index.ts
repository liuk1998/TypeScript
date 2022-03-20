/*
 * @Author: your name
 * @Date: 2022-03-17 17:06:22
 * @LastEditTime: 2022-03-18 11:02:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/class/index.ts
 */
// ! 面向对象 基础

class People {
  // 成员属性
  static life: number = 100; // * static 静态资源
  protected name: string;
  protected sex: string;
  protected age: number;
  // 构造函数: 实例化(new)的时候走的函数
  constructor(name: string, sex: string, age: number) {
    this.name = name;
    this.sex = sex;
    this.age = age;
  };
  // 成员方法
  say(): string {
    return `我的名字是${this.name}, 我的年龄是${this.age}, 我的性别是${this.sex}, 我已度过人生的${this.age / People.life * 100}%`;
  };
};
const liuK: People = new People('刘可', '男', 24);
console.log('面向对象>>>>>父类', liuK.say(), liuK);

class LiuYM extends People { };
const liuYM: LiuYM = new LiuYM('刘依沫', '女', 11);
console.log('面向对象>>>>>子类', liuYM.say(), liuYM);

class LiuY extends People {
  // 子类中成员属性重写
  name: string;
  sex: string;
  age: number;
  constructor(name: string, sex: string, age: number) {
    super(name, sex, age);
    this.name = name;
    this.sex = sex;
    this.age = age;
  };
};
const liuY: LiuY = new LiuY('刘寅', '男', 20);
console.log('面向对象>>>>>子类', liuY.say(), liuY);
// // ---------------------------------------------------------------------------------



interface Features {
  name: string,
  action: string,
  type: string
};
class Animal implements Features { // * Animal类实现了Features接口。 Animal类必须声明 Features 中的属性。
  name: string;
  action: string;
  type: string
  constructor(name: string, action: string, type: string) {
    this.name = name;
    this.action = action;
    this.type = type;
  };
  say(): string {
    return `它的名字是${this.name}, 它在${this.action}, 这是一只${this.type}。`
  };
};
const tiger: Animal = new Animal('小白', '睡觉', '东北虎');
console.log('面向对象>>>>>类实现接口', tiger.say());
// // ---------------------------------------------------------------------------------



abstract class Star { // * 抽象类的关键词是abstract,里边的抽象方法也是abstract开头的。抽象类不能被实例化。子类继承这个类，会要求必须实现抽象类的abstract方法。
  abstract name: string;
  abstract say(): any;
  skill() {
    console.log(this.name);
  };
};
class XaoYang extends Star {
  name: string = '肖央';
  say() {};
};
const xy: Star = new XaoYang();
xy.skill();