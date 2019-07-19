# Dilithium

_本代码库来自[zpao/building-react-from-scratch](https://github.com/zpao/building-react-from-scratch), 个人学习使用._

---

## Modification

在大神的基础上, 这里只是升级了 webpack 版本, 转换代码为 ES6+, 并且添加了 vscode debug 支持

## Usage

### Installation

我们不需要在这里安装 npm 包, 应该去项目根目录使用 `npm run bootstrap` 来进行安装

### Development & Build

```bash
# Development
npm run dev

# Build
npm run build
```

## Project Structure

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
└── webpack.config.js
```

## Flow chart

图标功能建议使用 [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/) 插件来进行预览

### Basic Mount flowchart

```flow
start=>start: 开始Start

end=>end: 结束End

opInject=>operation: 把平台相关逻辑(DOMComponentWrapper)注入到HostComponent中用于挂载更新等操作
Inject DOMComponentWrapper into HostComponent for instantiateComponent

subRender=>subroutine: 开始渲染
Mount.render(element, node)

condIsRoot=>condition: 所提供的的node是否已经渲染
Mount.isRoot(node)?

opMount=>operation: 把element挂载到node上
Mount.mount(element, node)

subUpdate=>subroutine: 用element来更新node
Mount.update(element, node)

opUnMount=>operation: 这里先卸载组件
Mount.unmountComponentAtNode(node)

condInstantiateNativeElement=>condition: 开始实例化element
instantiateComponent(element)
是否是原生element实例化?
Instantiate Native Element?

opInstantiateNativeElement=>operation: 使用之前挂载的HostComponent来实例化
HostComponent.construct(element)
---(DOMComponentWrapperInstance)---

opInstantiateComponentElement=>operation: 直接实例化组件
new element.type(element.props)

opMountNativeElement=>operation: 原生挂载组件
DOMComponentWrapperInstance  mountComponent

subMountComponentElement=>subroutine: 调用Component实例mountComponent方法
ComponentInstance mountComponent

opMountNode=>operation: 把已经挂载的组件加载到页面中
DOM.empty(node)
DOM.appendChild(renderedNode)



start->opInject->subRender->condIsRoot->cond

condIsRoot(no)->opMount->condInstantiateNativeElement

condIsRoot(yes)->subUpdate->opUnMount->opMount

condInstantiateNativeElement(no)->opInstantiateComponentElement->subMountComponentElement(right)->condInstantiateNativeElement

condInstantiateNativeElement(yes)->opInstantiateNativeElement->opMountNativeElement->opMountNode->end

```

## License

The code here is based on React and thus retains React's BSD license.
