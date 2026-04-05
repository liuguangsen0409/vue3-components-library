# npm 发布 + GitHub Pages 部署 设计规格

## 概述

为 vue3-components-library 项目配置 npm 发布流程和 GitHub Pages 文档部署，均采用手动触发方式。

## 需求确认

- **触发方式**：手动操作（后续可加 CI/CD）
- **npm 账号**：已有，本地需 `npm login`
- **包名**：`@liuguangsen0409/vue3-components-library`（scope 公开包）
- **版本管理**：手动管理，直接修改 `package.json` 中的 `version` 或使用 `npm version` 命令

---

## 一、npm 发布

### 1.1 修改包名

`packages/lgs-ui-vue3/package.json` 中的 `name` 从 `lgs-ui-vue3` 改为 `@liuguangsen0409/vue3-components-library`。

### 1.2 添加 publishConfig

scope 包默认私有，需添加以下配置使其公开发布：

```json
"publishConfig": {
  "access": "public"
}
```

### 1.3 处理 workspace 依赖

当前 `dependencies` 中有 `workspace:*` 引用：

```json
"dependencies": {
  "@lgs-ui-vue3/components": "workspace:*",
  "@lgs-ui-vue3/hooks": "workspace:*",
  "@lgs-ui-vue3/utils": "workspace:*",
  "@lgs-ui-vue3/theme": "workspace:*"
}
```

构建产物已通过 Vite 将这些内部包代码打进 bundle，发布时不需要这些依赖。需要移除 `dependencies` 字段，只保留 `peerDependencies`。

### 1.4 添加发布脚本

在根 `package.json` 的 `scripts` 中添加：

```json
"publish:lib": "pnpm build && cd packages/lgs-ui-vue3 && npm publish"
```

### 1.5 发布流程

```
1. npm login                  （首次需要，登录 npm）
2. 修改 version（如需要）       （手动改 package.json 或 npm version patch/minor/major）
3. pnpm publish:lib           （构建 + 发布）
```

### 1.6 需要修改的文件

| 文件 | 修改内容 |
|------|---------|
| `packages/lgs-ui-vue3/package.json` | 改 name、添加 publishConfig、移除 dependencies |
| `package.json`（根） | 添加 `publish:lib` 脚本 |

---

## 二、GitHub Pages 部署

### 2.1 配置 VitePress base 路径

`docs/.vitepress/config.mts` 中添加：

```typescript
base: '/vue3-components-library/',
```

GitHub Pages 项目站点 URL 为 `https://liuguangsen0409.github.io/vue3-components-library/`，必须设置 base 使资源路径正确。

### 2.2 安装 gh-pages

在根目录安装为 devDependency：

```bash
pnpm add -D gh-pages -w
```

### 2.3 添加部署脚本

在根 `package.json` 的 `scripts` 中添加：

```json
"docs:deploy": "pnpm docs:build && gh-pages -d docs/.vitepress/dist"
```

### 2.4 更新 socialLinks

`docs/.vitepress/config.mts` 中 GitHub 链接改为实际仓库地址：

```typescript
{ icon: 'github', link: 'https://github.com/liuguangsen0409/vue3-components-library' }
```

### 2.5 GitHub 仓库设置

在仓库 Settings → Pages 中：
- Source 选择 `Deploy from a branch`
- Branch 选择 `gh-pages`，目录选择 `/ (root)`

### 2.6 部署流程

```
1. pnpm docs:deploy            （构建文档 + 推送到 gh-pages 分支）
2. GitHub 自动从 gh-pages 分支发布
3. 访问 https://liuguangsen0409.github.io/vue3-components-library/
```

### 2.7 需要修改的文件

| 文件 | 修改内容 |
|------|---------|
| `docs/.vitepress/config.mts` | 添加 `base`，更新 socialLinks |
| `package.json`（根） | 安装 gh-pages、添加 `docs:deploy` 脚本 |

---

## 实施顺序

1. 修改 `packages/lgs-ui-vue3/package.json`（包名、publishConfig、移除 dependencies）
2. 修改 `docs/.vitepress/config.mts`（base、socialLinks）
3. 安装 `gh-pages`
4. 修改根 `package.json`（添加 publish:lib、docs:deploy 脚本）
5. 用户手动执行 `npm login`
6. 执行 `pnpm publish:lib` 发布 npm
7. 执行 `pnpm docs:deploy` 部署文档
8. 在 GitHub 仓库 Settings 中启用 Pages
