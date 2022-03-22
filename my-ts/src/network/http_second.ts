/*
 * @Author: your name
 * @Date: 2022-03-21 11:09:38
 * @LastEditTime: 2022-03-21 11:18:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/my-ts/src/network/http_second.ts
 */
/**
 * 接口请求的方法(第二版)
 */

import axios from 'axios';

const AXIOS_DEFAULT_CONFIG1 = {
  baseURL: location.origin, // * 自动加在 `url` 前面, 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  timeout: 20000 // * 指定请求超时的毫秒数, 如果请求话费了超过 `timeout` 的时间，请求将被中断
};

const http = axios.create(AXIOS_DEFAULT_CONFIG1); // * 新建一个 axios 实例

function fetchData(code: string) {
  const params: any = {
    'page': '1',
    'pageSize': '100',
    'modelCode': code,
  };
  return http.post('', params).then((res: any) => {
    console.log(res);
    if (res.status === 1) {
      const result = res.data.items;
      if (result) {
        return new Promise((resolve: Function) => {
          resolve(result);
        });
      };
    };
  });
};

fetchData('').then((res) => {
  console.log(res);
})