# 快速开始

本组件库基于 [Element Plus](https://element-plus.org/) 进行二次封装，使用前需要先安装 Element Plus。

## 安装依赖

```bash
# 安装组件库和 Element Plus
pnpm add lgs-ui-vue3 element-plus
```

## 完整引入

在 `main.ts` 中全局注册：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import LgsUi from 'lgs-ui-vue3'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(LgsUi)
app.mount('#app')
```

## 按需引入

```vue
<script setup>
import { LgsButton } from 'lgs-ui-vue3'
</script>

<template>
  <LgsButton type="primary">按钮</LgsButton>
</template>
```

::: tip 提示
无论是完整引入还是按需引入，都需要确保项目中已安装并引入了 Element Plus 及其样式。
:::
