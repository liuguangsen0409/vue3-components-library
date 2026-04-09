import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@lgs-ui-vue3/theme/src/index.scss'

import VpDemo from './components/vp-demo.vue'
import * as components from '@lgs-ui-vue3/components'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.component('VpDemo', VpDemo)

    Object.entries(components).forEach(([_key, comp]) => {
      if (comp && typeof comp === 'object' && 'name' in comp) {
        app.component((comp as any).name, comp as any)
      }
    })
  },
}

export default theme
