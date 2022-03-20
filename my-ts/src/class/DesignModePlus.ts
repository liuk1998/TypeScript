/*
 * @Author: your name
 * @Date: 2022-03-20 09:14:04
 * @LastEditTime: 2022-03-20 12:58:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/class/DesignModePlus.ts
 */
// ! 设计模式
/**
 * 观察者模式 如果用于遍历的话，用数组来作为容器；如果用于查找的话，用 Map 结构来管理
 */
interface Type {
  callBack: Function;
  caller: object; // this
};
class CallList { // * 管理函数与this的类
  protected List: Type[] = [];

  add(callBack: Function, caller: object) { // * 增加
    this.List.push({ callBack, caller });
  };

  contains(callBack: Function, caller: object): boolean { // * 是否存在
    return this.List.findIndex((itm: Type) => itm.callBack === callBack && itm.caller === caller ) >= 0;
  };

  remove(callBack: Function, caller: object): boolean { // * 删除
    let index = this.List.findIndex((itm: Type) => itm.callBack === callBack && itm.caller === caller );
    if (index < 0) {
      return false;
    } else {
      this.List.splice(index, 1);
      return true;
    };
  };

  fire(...data: any[]) { // * 调用
    for (let i = 0; i < this.List.length; i++) {
      let val = this.List[i];
      if (N(val) || N(val.caller)) { // 如果不存在函数与this; 或者this; 就删除
        this.List.splice(i, 1);
      } else {
        if (!N(val.caller)) { // 如果存在this的话就绑定对应的this指向。再执行对应的函数
          let call = val.callBack.bind(val.caller);
          call(...data);
        } else { // 如果不存在this的话，就直接执行对应的函数
          val.callBack(...data);
        };
        i++;
      };
    };
  };

  clear() {
    this.List = []; // * 清空管理数组
  };

};
// // ---------------------------------------------------------------------------------
function N(v: any): boolean {
  // return [null, undefined].includes(v);
  return -1 != [null, undefined].indexOf(v);
};
// // ---------------------------------------------------------------------------------
class EventManger { // * 事件派发类
  protected eventList: Map<any, CallList>; // key为标识，value为对应要执行的函数及this。
  constructor() {
    this.eventList = new Map();
  };

  addEvent(key: any, func: Function, caller: any = null) { // todo 新增
    if(this.eventList.has(key)) { // 已存在key，但没有key对应的函数与this的话，就在管理函数类中添加key对应的函数及this
      let notify = this.eventList.get(key);
      if(!notify?.contains(func, caller)) {
        notify?.add(func, caller);
      };
    } else { // 不存在key的话，就在事件派发类中添加key，在管理函数类中添加对应的函数、this
      let notify = new CallList();
      notify.add(func, caller);
      this.eventList.set(key, notify);
    };
  };

  removeEvent(key: any, func: Function, caller: any = null) {  // todo 删除
    if(N(func)) { // 如果函数存在，直接在事件派发类中删掉key。
      this.eventList.delete(key);
      return;
    };
    if(this.eventList.has(key)) { // 如果key存在，并且也存在对应的函数及this的话，在管理函数类中删掉对应的函数及this。
      let notify = this.eventList.get(key);
      if(notify?.contains(func, caller)) {
        let b = notify.remove(func, caller);
        console.log('remove Event id', key, b);
      };
    }
  };

  fireEvent(key: any, ...event: any[]) { // * 调用
    if(this.eventList.has(key)) {
      let notify = this.eventList.get(key);
      notify?.fire(...event);
    };
  };

  destroy() { // * 清空
    this.eventList.clear();
  };
};

export default new EventManger();

/**
 * 使用
 * 新增：Event.addEvent(key, func, this);
 * 删除：Event.removeEvent(key, func, this);
 * 调用：Event.fireEvent(key);
 */