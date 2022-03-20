/*
 * @Author: your name
 * @Date: 2022-03-18 12:44:10
 * @LastEditTime: 2022-03-20 12:53:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/class/test.ts
 */
// ! 调用设计模式
import SingleCase, { Land, Sea } from './DesignMode';
import EventManger from './DesignModePlus';
import Event from './lisi';

SingleCase.use();

console.log(`工厂模式>>>>>`, new Land().someOperation(), new Sea().someOperation());

class Test {
  example: string = '升级版观察者模式>>>>>';
  instructions() {
    console.log(this.example);
  };
  event() {
    EventManger.addEvent('test', this.instructions, this);
  };
  remove() {
    EventManger.removeEvent('test', this.instructions, this);
  };
};
const test = new Test();
test.event();

EventManger.fireEvent('test');

setTimeout(() => {
  test.remove();
}, 2000);

setTimeout(() => {
  EventManger.fireEvent('test');
}, 2500);