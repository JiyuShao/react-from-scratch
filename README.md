# Building React From Scratch

_本项目是对于[React Implementation Notes](https://reactjs.org/docs/implementation-notes.html)文档的学习, 并且使用了`lerna`来进行各项目的管理._

---

## Usage

### Installation

```bash
# 安装npm包
npm install
npm run bootstrap
```

### Run Demo

本项目目前有两个 react 包, 一个是 `dilithium`, 一个是 `react-stack-reconciler`, 所以在运行 demo 的时候需要选择使用哪个版本

```bash
# 这里我们可以使用以下命令来查看当前所有的项目
npm run ls
```

#### Choose React package

比如说我们想使用 `react-stack-reconciler`, 首先去 `packages/demo/app.js` 来修改对 `React` 的引用

```jsx
// 如果是使用 dilithium , 则应该使用本条
// import React from 'dilithium';
import React from 'react-stack-reconciler';
```

#### Generate library

在使用 `react` 包之前, 应该先对其进行打包, 打包会生成/lib/文件夹, 这样的话就可以在代码中直接引用

```bash
# 进入相应的文件夹
cd packages/react-stack-reconciler/

# 打包
npm run build

# 或者开发
npm run dev
```

#### Start Demo page

```bash
cd packages/demo

npm run start
```

## Debugging

这里我们使用 `demo` 项目来进行调试, 因为我们的 `react` 包也都有添加 `source map`, 所以也可以对当前引用的 `react` 包进行调试.

本项目建议使用 `VSCode` 来进行调试, .vscode 里已经添加了基于 `Chrome` 的调试

- 第一步, Start Demo Page
- 第二步, 在 VSCode Debugger 里运行 Launch Demo Localhost
- 最后, 就可以在 VSCode 中打断点啦
