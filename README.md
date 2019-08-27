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

### Quick Start

如果想快速开始项目, 需要

1. 运行 `npm run start` 开启动 demo 项目
2. 打开并访问 `localhost:3000`

`npm run start` 主要运行了两个代码

- 运行 `lerna run build` 快速打包所有含有 build script 的项目
- 运行 `lerna run start` 开启动 demo 项目

#### Switch React package

本项目目前有三个 react 包, `dilithium`, `react-stack-reconciler`, 和 `didact-fiber-reconciler` 所以在运行 demo 的时候需要选择使用哪个版本

1. 直接访问 `http://localhost:3000/` 会默认使用 `react-stack-reconciler`
2. 访问 `http://localhost:3000/?dilithium` 则会使用 `dilithium` 作为当前 React
3. 访问 `http://localhost:3000/?didact` 则会使用 `didact-fiber-reconciler` 作为当前 React

#### Dev/Build React Separately

在使用 `react` 包之前, 应该先对其进行打包, 打包会生成/lib/文件夹, 这样的话就可以在代码中直接引用

```bash
# 这里我们可以使用以下命令来查看当前所有的项目
npm run ls

# 进入相应的文件夹
cd packages/react-stack-reconciler/

# 打包
npm run build

# 或者开发
npm run dev
```

## Debugging

这里我们使用 `demo` 项目来进行调试, 因为我们的 `react` 包也都有添加 `source map`, 所以也可以对当前引用的 `react` 包进行调试.

本项目建议使用 `VSCode` 来进行调试, .vscode 里已经添加了基于 `Chrome` 的调试

1. 第一步, Start Demo Page
2. 第二步, 在 VSCode Debugger 里运行 Launch Demo Localhost
3. 最后, 就可以在 VSCode 中打断点啦
