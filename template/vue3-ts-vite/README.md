# vue3-ts-vite (主框架 Vue 3 + Typescript + Vite)

- 此项目使用 vue3+vite+ts 搭建
- 建议先阅读此文件
- 快速启动 yarn && yarn dev
- node >= 14

## 部分命令 (yarn || npm)

推荐使用 yarn 或 pnpm 管理和启动项目， yarn 和 npm 命令对照

- yarn = npm install
- yarn dev = npm run dev
- yarn build = npm run build
- yarn add XXX = npm install XXX --save
- yarn add XXX --dev = npm install XXX --save-dev
- yarn global add XXX = npm install XXX --global
- yarn remove = npm uninstall
- yarn upgrade = rm -rf node_modules && npm install

npm 安装 yarn ==> npm install yarn -g (或者直接官网下载安装 yarn)
npm 安装 pnpm ==> npm install pnpm -g (或者直接官网下载安装 pnpm)

## ant-design-vue

- UI 部分参考 ant-design-vue 文档
- [Ant Design of Vue](https://next.antdv.com/docs/vue/introduce-cn/)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

## 代码检查 eslint + prettier

- 项目运行和打包过程会进行 eslint 检查，需针对提示进行修改
- 建议同时开启 IDE 的 eslint 插件，开发中有 eslint 检查提示

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
