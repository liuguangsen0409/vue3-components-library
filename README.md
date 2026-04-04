# Lgs UI Vue3

基于 Element Plus 二次封装的 Vue 3 组件库，采用 pnpm monorepo 架构管理。
通过对 Element Plus 组件的封装扩展，实现统一的样式主题和业务定制能力。

## 技术栈

- **框架**：Vue 3 + TypeScript
- **基础组件**：Element Plus
- **包管理**：pnpm workspace (monorepo)
- **构建工具**：Vite
- **文档站**：VitePress
- **样式方案**：SCSS + BEM 命名规范

## 项目结构

```
vue3-components-library/
├── packages/
│   ├── components/          # 组件源码
│   │   └── button/          # Button 组件（以此为模板新增组件）
│   │       ├── index.ts     # 组件入口，使用 withInstall 注册
│   │       └── src/
│   │           ├── button.ts    # Props/Emits 类型定义
│   │           └── button.vue   # 组件模板与逻辑
│   ├── hooks/               # 组合式函数
│   │   └── use-namespace.ts # BEM 类名生成器
│   ├── utils/               # 工具函数
│   │   └── install.ts       # withInstall 组件注册工具
│   ├── theme/               # 样式主题
│   │   └── src/
│   │       ├── index.scss       # 样式入口
│   │       ├── reset.scss       # 重置样式
│   │       ├── button.scss      # Button 组件样式
│   │       ├── common/var.scss  # SCSS 变量
│   │       └── mixins/mixins.scss # SCSS 混入
│   └── lgs-ui-vue3/         # 聚合包（最终发布的 npm 包）
│       └── index.ts         # 统一导出所有组件/hooks，提供全局安装
├── docs/                    # VitePress 文档站
│   ├── .vitepress/
│   │   ├── config.mts       # 文档站配置（导航、侧边栏、alias）
│   │   └── theme/           # 自定义主题（含 vp-demo 组件）
│   ├── examples/            # 组件示例代码（按组件名分文件夹）
│   └── zh-CN/               # 中文文档
│       ├── component/       # 组件文档
│       └── guide/           # 指南文档
├── internal/
│   └── build/               # 构建脚本（Vite 打包 + SCSS 编译）
├── pnpm-workspace.yaml      # monorepo 工作区配置
├── tsconfig.json            # TypeScript 配置（含路径别名）
└── package.json             # 根 package.json（开发脚本入口）
```

### 包职责说明

| 包名 | 路径 | 作用 |
|------|------|------|
| `@lgs-ui-vue3/components` | `packages/components` | 所有组件的源码，每个组件一个文件夹 |
| `@lgs-ui-vue3/hooks` | `packages/hooks` | 组合式函数，如 BEM 类名生成器 |
| `@lgs-ui-vue3/utils` | `packages/utils` | 工具函数，如 `withInstall` 组件注册 |
| `@lgs-ui-vue3/theme` | `packages/theme` | SCSS 样式主题，按组件拆分样式文件 |
| `lgs-ui-vue3` | `packages/lgs-ui-vue3` | 聚合包，统一导出并提供全局安装方法 |

## 开发思路

### 架构设计

采用 **pnpm monorepo** 管理多个内部包，各包职责单一、相互独立，通过 `workspace:*` 协议互相引用。
最终由 `lgs-ui-vue3` 聚合包统一导出，对外只暴露一个入口。

### 组件封装策略

组件基于 **Element Plus 二次封装**，核心思路：
- 继承 Element Plus 组件的全部 Props 和 Emits（通过 `v-bind="$attrs"` 透传）
- 在此基础上扩展自定义样式和业务逻辑
- 使用 `defineOptions` 定义组件名，关闭 `inheritAttrs` 以手动控制属性透传

### 样式方案

采用 **BEM 命名规范**，通过 `useNamespace` hook 自动生成类名：
- 命名空间前缀：`lgs`
- 格式：`lgs-{block}[__{element}][--{modifier}]`
- 状态类：`is-{state}`

每个组件有独立的 `.scss` 文件，通过 `theme/src/index.scss` 统一引入。

### 组件注册机制

通过 `withInstall` 工具函数为每个组件添加 `install` 方法，支持两种使用方式：
- **全局注册**：`app.use(LgsUiVue3)` 一次性注册所有组件
- **按需引入**：`app.use(LgsButton)` 单独注册某个组件

### 文档系统

基于 **VitePress** 搭建文档站，通过 Vite alias 直接引用源码包，无需构建即可实时预览组件效果。
自定义了 `vp-demo` 组件，支持在 Markdown 中嵌入可交互的组件示例。

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动文档站开发服务器 |
| `pnpm docs:build` | 构建文档站 |
| `pnpm docs:serve` | 预览构建后的文档站 |
| `pnpm build` | 构建组件库（输出到 `packages/lgs-ui-vue3/dist`） |
| `pnpm clean` | 清除构建产物 |

## 新增组件指南

### 快速清单

以新增 `Input` 组件为例，需要创建/修改以下文件：

**需要新建的文件：**

| # | 文件路径 | 作用 |
|---|---------|------|
| 1 | `packages/components/input/src/input.ts` | 定义 Props 和 Emits 类型 |
| 2 | `packages/components/input/src/input.vue` | 组件模板与逻辑 |
| 3 | `packages/components/input/index.ts` | 组件入口，调用 withInstall 注册 |
| 4 | `packages/theme/src/input.scss` | 组件样式 |
| 5 | `docs/examples/input/basic.vue` | 基础用法示例 |
| 6 | `docs/zh-CN/component/input.md` | 组件文档页 |

**需要修改的文件：**

| # | 文件路径 | 修改内容 |
|---|---------|---------|
| 7 | `packages/components/index.ts` | 添加 `export * from './input'` |
| 8 | `packages/theme/src/index.scss` | 添加 `@use './input.scss'` |
| 9 | `docs/.vitepress/config.mts` | 在 sidebar 中添加组件导航项 |

---

### 完整示例：以新增 Input 组件为例

#### 1. 定义类型 — `packages/components/input/src/input.ts`

```typescript
import type { ExtractPropTypes } from 'vue'
import { inputProps as elInputProps, inputEmits as elInputEmits } from 'element-plus'

export const inputProps = elInputProps
export const inputEmits = elInputEmits

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits
```

#### 2. 组件实现 — `packages/components/input/src/input.vue`

```vue
<template>
  <el-input v-bind="$attrs" :class="ns.b()">
    <template v-for="(_, name) in $slots" #[name]="slotData" :key="name">
      <slot :name="name" v-bind="slotData ?? {}" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
import { useNamespace } from '@lgs-ui-vue3/hooks'

defineOptions({
  name: 'LgsInput',
  inheritAttrs: false,
})

const ns = useNamespace('input')
</script>
```

#### 3. 组件入口 — `packages/components/input/index.ts`

```typescript
import { withInstall } from '@lgs-ui-vue3/utils'
import Input from './src/input.vue'

export const LgsInput = withInstall(Input)
export default LgsInput

export * from './src/input'
```

#### 4. 组件样式 — `packages/theme/src/input.scss`

```scss
@use './mixins/mixins.scss' as *;
@use './common/var.scss' as *;

@include b(input) {
  // 自定义样式
}
```

#### 5. 注册导出 — 修改 `packages/components/index.ts`

```typescript
export * from './button'
export * from './input'   // 新增
```

#### 6. 引入样式 — 修改 `packages/theme/src/index.scss`

```scss
@use './input.scss';  // 新增
```

#### 7. 文档示例 — `docs/examples/input/basic.vue`

```vue
<template>
  <lgs-input placeholder="请输入内容" />
</template>
```

#### 8. 组件文档 — `docs/zh-CN/component/input.md`

```markdown
---
title: Input 输入框
lang: zh-CN
---

# Input 输入框

## 基础用法

:::demo
input/basic
:::
```

#### 9. 文档导航 — 修改 `docs/.vitepress/config.mts`

在 sidebar 的 `/zh-CN/component/` 数组中添加：

```typescript
{ text: 'Input 输入框', link: '/zh-CN/component/input' }
```
