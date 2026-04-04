# README 设计规格

## 概述

为 vue3-components-library 项目编写一份中文 README.md，放置在项目根目录。

## 目标读者

个人备忘，方便日后回顾项目结构、开发思路和新增组件的流程。

## 组织方案

单一 `README.md` 文件，包含以下六个章节：

### 1. 项目简介

一句话概括项目定位：基于 Element Plus 二次封装的 Vue 3 组件库，采用 pnpm monorepo 架构。

### 2. 技术栈

列出关键技术选型：Vue 3 + TypeScript、Element Plus、pnpm workspace、Vite、VitePress、SCSS + BEM。

### 3. 项目结构

- 目录树（排除 node_modules、dist 等），标注每个关键文件/目录的用途
- 表格说明五个内部包的名称、路径、职责

### 4. 开发思路

分五个小节阐述核心设计决策：
- **架构设计**：pnpm monorepo + workspace:* 协议 + 聚合包统一导出
- **组件封装策略**：继承 Element Plus 全部 Props/Emits，通过 v-bind="$attrs" 透传，defineOptions 设组件名
- **样式方案**：BEM 命名规范，useNamespace hook 自动生成类名，命名空间前缀 `lgs`
- **组件注册机制**：withInstall 工具函数，支持全局注册和按需引入
- **文档系统**：VitePress + Vite alias 直接引用源码 + 自定义 vp-demo 组件

### 5. 快速开始

- 环境要求：Node.js >= 18, pnpm >= 8
- 安装命令：`pnpm install`
- 常用命令表格：dev、docs:build、docs:serve、build、clean

### 6. 新增组件指南

两部分结构：

**第一部分 — 快速清单**：
表格列出新增组件需要创建的 6 个文件和需要修改的 3 个文件，每行标注文件路径和作用。

**第二部分 — 完整示例**：
以 Input 组件为例，逐步展示 9 个文件的具体代码内容：
1. `packages/components/input/src/input.ts` — 类型定义
2. `packages/components/input/src/input.vue` — 组件实现
3. `packages/components/input/index.ts` — 组件入口
4. `packages/theme/src/input.scss` — 组件样式
5. `packages/components/index.ts` — 注册导出（修改）
6. `packages/theme/src/index.scss` — 引入样式（修改）
7. `docs/examples/input/basic.vue` — 文档示例
8. `docs/zh-CN/component/input.md` — 组件文档页
9. `docs/.vitepress/config.mts` — 文档导航（修改）

## 约束

- 语言：中文
- 文件：根目录 `README.md`，单一文件
- 预估长度：250-300 行
- 代码模板基于项目中已有的 Button 组件模式
