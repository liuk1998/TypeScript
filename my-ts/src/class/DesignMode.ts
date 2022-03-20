/*
 * @Author: your name
 * @Date: 2022-03-18 11:03:08
 * @LastEditTime: 2022-03-19 12:36:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/class/DesignMode.ts
 */
// ! 设计模式

// todo -> Vue双向数据绑定  get  set
class Person {
  private _num: number = 100;

  get num(): number { // * get 必须有返回值
    return this._num;
  };

  set num(b: number) { // * set 必须传参
    this._num = b;
  };
};
const p: Person = new Person();
console.log(p.num); // * 调用get
p.num = 10; // * 调用set
console.log(p.num); // * 调用get



// todo -> 单例模式 : 保证一个类只有一个实例，并提供一个访问它的全局访问点。
// todo -> 使用场景 : 一些对象我们往往只需要一个，比如线程池，全局缓存，浏览器中的window对象，登陆浮窗等。
// todo -> 优点 : 可以用来划分命名空间，减少全局变量的数量/可以被实例化，且再次实例化生成的也是第一个实例。
class SingleCase {
  attribute: string = '单例模式!';
  use() {
    console.log(this.attribute);
  };
};
export default new SingleCase();



// todo -> 工厂方法模式 : 一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。
/**
 * 举例来说,卡车 Truck 和轮船 Ship 类都必须实现运输 Transport 接口,该接口声明了一个名为 deliver交付的方法。
 * 每个类都将以不同的方式实现该方法：卡车走陆路交付货物，轮船走海路交付货物。陆路运输 Land 类中的工厂方法返回卡车对象,而海路运输 Sea 类则返回轮船对象。
 */
interface Transport { // * 产品接口 声明 所有具体产品 必须实现的操作。
  deliver(): string;
};
class Truck implements Transport { // * 卡车类
  deliver(): string {
    return '陆地运输';
  };
};
class Ship implements Transport { // * 轮船类
  deliver(): string {
    return '水上运输';
  };
};
// // ---------------------------------------------------------------------------------
abstract class Factory { // * Factory类声明了应该返回产品类对象的工厂方法。创建者的子类通常提供此方法的实现。
  public abstract factoryMethod(): Transport; // * 工厂方法。返回产品
  someOperation(): string {
    return this.factoryMethod().deliver(); // * 使用产品。
  };
};
export class Land extends Factory {
  public factoryMethod(): Transport {
    return new Truck();
  };
};
export class Sea extends Factory {
  public factoryMethod(): Transport {
    return new Ship();
  };
};



// todo -> 观察者模式 : 一种行为设计模式， 允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。(通过数组来管理)
interface Subject { // * Subject接口声明了一组用于管理订阅服务器的方法。
  add(observer: Observer): void; // * 添加观察者。
  delete(observer: Observer): void; // * 删除观察者。
  notify(): void; // * 将事件通知所有观察者。
};
class Official implements Subject {  // 相当于公众号
  public state: number = 0; // * 为了简单起见，主题的状态（对所有订户都是必需的）存储在这个变量中。
  private list: Observer[] = []; // * 订阅服务器列表。

  add(observer: Observer): void {
    const isExist = this.list.includes(observer);
    if(isExist) {
      return console.log('订阅服务器: 观察者已存在。');
    };
    console.log(`订阅服务器: 添加${observer.name}。`,observer);
    this.list.push(observer);
  };

  delete(observer: Observer): void {
    const obsIndex = this.list.indexOf(observer);
    if(obsIndex === -1) {
      return console.log('订阅服务器: 不存在这位观察者。');
    };
    console.log('订阅服务器: 删除观察者');
    this.list.splice(obsIndex, 1);
  };

  notify() { // * 在每个订阅服务器中触发更新。
    console.log('订阅服务器: 内容更新, 通知观察员。。。');
    this.list.forEach((obs: Observer) => {
      obs.update(this); // * 触发订阅者的方法。 this指的是Official这个类
    });
  };

  someBusinessLogic(): void {
    this.state = ~~(Math.random() * (20 - 10 + 1) + 10);
    console.log(`订阅服务器: 我正在做一件重要的事。我的状态刚刚改为：${this.state}`);
    this.notify();
  };
};
// // ---------------------------------------------------------------------------------
interface Observer { // * Observer接口声明了主题使用的update方法。 观察者
  name: string;
  update(subject: Subject): void; // * 从公众号接收更新。
};
class A implements Observer { // 相当于订阅公众号的我们
  name: string = '刘可';
  update(subject: Subject): void {
    if(subject instanceof Official && subject.state < 15) {
      console.log(`${this.name}:对事件做出反应。`);
    };
  };
};
class B implements Observer { // 相当于订阅公众号的我们
  name: string = '肖央';
  update(subject: Subject): void {
    if(subject instanceof Official && subject.state > 15) {
      console.log(`${this.name}:对事件做出反应。`);
    };
  };
};
const office: Official = new Official();
const LK: Observer = new A();
const XY: Observer = new B();
office.add(LK);
office.add(XY);
office.someBusinessLogic();

