<!--
 * @Author: your name
 * @Date: 2022-03-04 14:06:45
 * @LastEditTime: 2022-03-22 10:04:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /TypeScript/README.md
-->
# TypeScript

## 构建工具:
### 一、Vite: 从底层原理上来说，Vite是基于esbuild(构建工具)预构建依赖。而esbuild是采用go语言编写，因为go语言的操作是纳秒级别，而js是以毫秒计数，所以Vite比用js编写的打包器快10-100倍。Vite启动的时候不需要打包，所以不用分析模块与模块之间的依赖关系，不用进行编译。可以进行按需加载。当浏览器请求某个模块时，再根据需要对模块内容进行编译。按需动态编译可以缩减编译时间，当项目越复杂，模块越多的情况下，Vite明显优于webpack。vite相关生态没有webpack完善，vite可以作为开发的辅助。
#### 1. 运行: npm init vite@latest my-vue-app --template vanilla-ts (支持vanilla，vanilla-ts，vue，vue-ts，react，react-ts，preact，preact-ts，lit，lit-ts，svelte，svelte-ts)。
#### 2. 在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。
#### 3. 命令行界面: (1)"dev": "vite", // 启动开发服务器，别名：vite dev，vite serve。(2)"build": "vite build", // 为生产环境构建产物。(3)"preview": "vite preview" // 本地预览生产构建产物
#### 4. 功能: Vite 天然支持引入 .ts 文件。

***

# 面向对象:
### 面向对象与面向过程是相辅相成的。
### 面向对象便于更好的管理代码，使之模块化。

### 类的三大特性：继承、封装、多态。
#### (1)继承。extends
#### (2)封装。使成员属性封装起来 ，有三个关键词：private 私有的(只能这个类自己用。)、public 公共的、protected 受保护的(只能这个类与继承这个类的子类使用)
#### (3)多态。成员方法重载与重写。适用于强语言，对于JavaScript来说意义不大。
####    重载为 当前类已经声明一个成员方法，再次在当前类中重新写一遍这个方法。
####    重写为 当前类已经声明一个成员方法，继承这个类的子类再次重新写一遍这个方法。

***
# HTTP与WebSocket:
### HTTP:
#### 超文本传输协议, 是为 Web 浏览器与 Web 服务器之间的通信而设计的。基于 TCP/IP 通信协议。默认端口号为80，但是你也可以改为8080或者其他端口。
#### 缺陷：通信只能由客户端发起。
### WebSocket:
#### 最大特点: 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
#### 其他特点: （1）建立在 TCP 协议之上，服务器端的实现比较容易。（2）与 HTTP 协议有着良好的兼容性。（3）数据格式比较轻量，性能开销小，通信高效。（4）可以发送文本，也可以发送二进制数据。（5）没有同源限制，客户端可以与任意服务器通信。（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。


