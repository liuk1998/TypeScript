/*
 * @Author: your name
 * @Date: 2022-03-20 10:57:07
 * @LastEditTime: 2022-03-20 10:57:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/class/eee.ts
 */
/*
 * @Author: your name
 * @Date: 2021-10-21 14:20:15
 * @LastEditTime: 2021-10-26 19:23:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-vue-app/src/typescript/class_plus.ts
 */
// ! 升级版观察者模式
/**
 * 观察者模式 如果用于遍历的话，用数组来作为容器；如果用于查找的话，用 Map 结构来管理
 */
 interface Type {
  callBack: Function,
  caller: object // this
}
class CallList { // ? 管理函数的类
  protected List: Type[] = [];

  add(callBack: Function, caller: object) {  // * 增加
    this.List.push({ callBack, caller });
  }

  contains(callBack: Function, caller: object): boolean {  // * 是否存在
    return this.List.findIndex((itm: Type) => {
      return itm.callBack === callBack && itm.caller === caller;
    }) >= 0;
  }

  clear() {
    this.List = [];  // * 清空管理数组
  }

  remove(callBack: Function, caller: object): boolean {  // * 删除
    let index = this.List.findIndex((itm: Type) => {
      return itm.callBack === callBack && itm.caller === caller;
    });
    if (index < 0) {
      return false;
    } else {
      this.List.splice(index, 1);
      return true;
    }
  }

  fire(...data: any[]) {  // * 调用
    for (let i = 0; i < this.List.length; i++) {
      let val = this.List[i];
      if (N(val) || N(val.callBack)) {  // 如果为null 或 undefined 就删除
        this.List.splice(i, 1);
      } else {
        if (!N(val.caller)) {
          let call = val.callBack.bind(val.caller);
          call(...data);
        } else {
          val.callBack(...data);
        }
        i++;
      }
    }
  }
}

function N(v: any) {
  return -1 != [null, undefined].indexOf(v);
}

class EventManger { // ? 事件派发类
  protected eventList: Map<any, CallList>;
  constructor() {
    this.eventList = new Map();
  }
  public addEvent(key: any, func: Function, caller: any = null) {  // todo 新增
    if (this.eventList.has(key)) {
      let notify = this.eventList.get(key);
      if (!notify?.contains(func, caller)) {
        notify?.add(func, caller);
      }
    } else {
      let notify = new CallList();
      notify.add(func, caller);
      this.eventList.set(key, notify);
    }
  }
  public removeEvent(key: any, func: Function, caller: any = null) {  // todo 删除
    if (N(func)) {
      this.eventList.delete(key);
      return;
    }
    if (this.eventList.has(key)) {
      let notify = this.eventList.get(key);
      if (notify?.contains(func, caller)) {
        let b = notify.remove(func, caller);
        console.log('remove Event id', key, b);
      }
    }
  }
  public fireEvent(key: any, ...event: any[]) {
    if (this.eventList.has(key)) {
      let notify = this.eventList.get(key);
      notify?.fire(...event);
    }
  }
  protected destroy() {
    this.eventList.clear();
  }
}

export default new EventManger();

/**
 * 使用
 * 新增：Event.addEvent(key, func, this);
 * 删除：Event.removeEvent(key, func, this);
 * 调用：Event.fireEvent(key);
 */
