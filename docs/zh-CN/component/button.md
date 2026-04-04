# Button 按钮

基于 Element Plus 的 `ElButton` 二次封装，继承其所有属性、事件和插槽。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<VpDemo path="button/basic" />

## 不同类型

使用 `type` 属性设置不同的按钮类型，支持 `plain` 和 `round` 变体。

<VpDemo path="button/type" />

## 不同尺寸

使用 `size` 属性设置按钮尺寸，支持 `large`、`default`、`small` 三种尺寸。

<VpDemo path="button/size" />

## 禁用与加载

使用 `disabled` 属性控制禁用状态，`loading` 属性控制加载状态。

<VpDemo path="button/disabled" />

## API

LgsButton 继承了 Element Plus [ElButton](https://element-plus.org/zh-CN/component/button.html) 的所有属性、事件和插槽。以下列出常用属性，完整列表请参考 Element Plus 文档。

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | — |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| circle | 是否为圆形按钮 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| icon | 图标组件 | `string \| Component` | — |
| native-type | 原生 type 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| auto-insert-space | 两个中文字符之间自动插入空格 | `boolean` | — |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| click | 点击按钮时触发 | `(evt: MouseEvent) => void` |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标 |
| loading | 自定义加载图标 |
