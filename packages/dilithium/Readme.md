# Dilithium

_A basic re-implementation of the React Stack Reconciler with zero dependencies._

---

The code here was written with the purpose of breaking down the implementation details of React. It was written as part of my "Building React From Scratch" talk at React Rally 2016.

I attempted to comment the code throughout so that it could be used for others to learn how React works.

Obviously this is not meant to be a replacement for React and doesn't cover all of the things that React does. In fact, it's missing some major pieces, like the event system.

## Building

```sh
npm install
npm run build
```

This builds a standalone browser version. It wasn't really tested that way and you might have some issues. Testing was done running the demo, which just bundles this with the app.

## License

The code here is based on React and thus retains React's BSD license.

## 项目结构说明

```bash
.
├── LICENSE                         # License
├── README.md                       # README文件
├── dilithium.js                    # 本项目入口文件
├── package.json                    # NodeJS配置文件
├── src                             # 主要代码目录
│   ├── ChildReconciler.js          # 用于发起子组件的挂载、卸载、重绘机制
│   ├── Component.js
│   ├── DOM.js                      # 浏览器平台的加载, 更新node(节点)的代码
│   ├── DOMComponentWrapper.js      # 继承自MultiChild, 目的是传入顶层element, 并在DOM平台把它包装成带有常用方法的顶层component
│   ├── Element.js
│   ├── HostComponent.js            # 可以注入不同平台的相关的实例化逻辑, 比如说注入DOMComponentWrapper
│   ├── Mount.js                    # 包括常用的mount, update, unmountComponentAtNode方法(使用DOM和Reconciler)
│   ├── MultiChild.js               # 封装了渲染children的常用逻辑, 会被DOMComponentWrapper继承
│   ├── Reconciler.js               # 用于发起顶层组件的挂载、卸载、重绘机制
│   ├── UpdateQueue.js              # 会在Component的setState方法用到, 会对传入的partialState进行队列处理, 并调用Reconciler来进行更新(performUpdateIfNecessary)
│   ├── assert.js                   # 简单的模拟node断言
│   ├── instantiateComponent.js     # 实例化组件代码, 使用已经注入好的HostComponent来把顶层element实例化成顶层component
│   ├── shouldUpdateComponent.js    # 是否应该更新组件, 如果为true则调用更新组件逻辑, 如果为false, 则先unmount然后再mount
│   └── traverseAllChildren.js      # 对子组件进行拍扁操作, 方便之后的对children组件们的比较
├── webpack.config.js
└── yarn.lock
```
