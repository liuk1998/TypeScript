/*
 * @Author: your name
 * @Date: 2022-03-21 11:24:02
 * @LastEditTime: 2022-03-21 11:58:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/network/websocket.ts
 */
/**
 * ws请求的方法
 */

class Ws {
  ws!: WebSocket;

  startWs() {
    this.ws = new WebSocket('ws://localhost:80/wsOnline/threeDaPIn'); // * WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。执行后，客户端就会与服务器进行连接。

    this.ws.onopen = (ev: Event) => { // * 用于指定连接成功后的回调函数。
      console.log('ws连接成功>>>>', ev);
    };

    this.ws.onclose = (ev: Event) => { // * 用于指定连接关闭后的回调函数。
      console.log('ws连接关闭>>>>', ev);
    };

    this.ws.onmessage = (ev: MessageEvent) => { // * 用于指定收到服务器数据后的回调函数。
      let data = JSON.parse(ev.data);
      console.log('ws发送数据>>>>', data);
    };

    this.ws.onerror = (ev: Event) => { // * 用于指定报错时的回调函数。
      console.log('ws连接报错>>>>', ev);
    };
  };
};

export default new Ws();