import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'Lgs UI Vue3',
  description: 'Vue 3 组件库',
  lang: 'zh-CN',

  themeConfig: {
    nav: [
      { text: '指南', link: '/zh-CN/guide/installation' },
      { text: '组件', link: '/zh-CN/component/button' },
    ],
    sidebar: {
      '/zh-CN/guide/': [
        {
          text: '基础',
          items: [
            { text: '安装', link: '/zh-CN/guide/installation' },
            { text: '快速开始', link: '/zh-CN/guide/quickstart' },
          ],
        },
      ],
      '/zh-CN/component/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/zh-CN/component/button' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],
    outline: {
      label: '页面导航',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@lgs-ui-vue3/components': resolve(__dirname, '../../packages/components'),
        '@lgs-ui-vue3/hooks': resolve(__dirname, '../../packages/hooks'),
        '@lgs-ui-vue3/utils': resolve(__dirname, '../../packages/utils'),
        '@lgs-ui-vue3/theme': resolve(__dirname, '../../packages/theme'),
        'lgs-ui-vue3': resolve(__dirname, '../../packages/lgs-ui-vue3'),
      },
    },
    ssr: {
      noExternal: ['element-plus'],
    },
  },
})
