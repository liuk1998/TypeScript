/*
 * @Author: your name
 * @Date: 2022-03-22 10:15:31
 * @LastEditTime: 2022-03-22 10:37:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/network/http.third.ts
 */
/**
 * 接口请求的方法(第三版)
 */
import axios, { AxiosInstance } from 'axios';

let http = axios.create({
  baseURL: '',
  timeout: 20000,
  maxContentLength: 2000,
  headers: {}
});

// * 添加响应拦截器, 指的是请求发送给服务器之后返回的时候。(处理返回数据)
http.interceptors.response.use((response) => {
  console.log(response);
  let res;
  if (response.status === 200) res = response.data;
  return response;
});

export type personleaf = { value: string, name: string, children?: personleaf[] };
type httCallBack<T> = (data: T) => void;
type httCallBackList<T> = (data: T[]) => void;

class NetWork {
  http: AxiosInstance;
  ws!: WebSocket; // 绝对赋值断言

  constructor() {
    this.http = http;
  };

  startWs() {
    this.ws = new WebSocket('');
    this.ws.onopen = (ev: Event) => {
      console.log('>>>ws open', ev);
    };
    this.ws.onclose = (ev: Event) => {
      console.log('>>>ws close');
    };
    this.ws.onmessage = (ev: MessageEvent) => {
      if (ev.data == '连接成功') {
        console.log('>>>ws 连接成功');
        return;
      }
      let data = JSON.parse(ev.data);
      console.log(data);
    };
    this.ws.onerror = (ev: Event) => {
      console.log('>>>ws error');
    };
  };

  baseGet(param: { url: string, params?: any, callBack: Function }) {
    return http.get(param.url, { params: param.params }).then((response: any) => {
      let data = response;
      if (data.errcode == 0) {
        param.callBack(data.data);
      } else {
        throw new Error(data.errmsg);
      }
    }).catch((e) => {
      console.error(e);
    });
  };

  basePost(param: { url: string, params?: any, callBack: Function }) {
    return http.post(param.url, param.params, { headers: { 'Content-Type': "application/json", "Accept": "*/*" } })
      .then((response: any) => {
        let data = response;
        if (data.errcode == 0) {
          param.callBack(data.data);
        } else {
          throw new Error(data.errmsg);
        }
      }).catch((e) => {
        console.error(e);
      });
  };

  // 使用例子
  use(params: { tagId: string }, callBack: httCallBackList<personleaf>) {
    return this.baseGet({
      url: '/path/tsdb/queryLocationHis',
      params: params,
      callBack: callBack
    });
  };
  useTwo(params: { region_id?: string, regid: string, name: string, vertex?: any[] }, callBack?: httCallBack<any>) {
    return this.basePost({
      url: '/location/addRegion',
      params: JSON.stringify(params),
      callBack: (d: any) => { callBack && callBack(d) },
    })
  };
};

let network = new NetWork();
// network.startWs();

network.use({tagId: ''}, () => {})