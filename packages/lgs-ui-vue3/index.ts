import type { App } from 'vue'
import * as components from '@lgs-ui-vue3/components'

export * from '@lgs-ui-vue3/components'
export * from '@lgs-ui-vue3/hooks'

const install = (app: App) => {
  Object.entries(components).forEach(([_key, comp]) => {
    if (comp && typeof comp === 'object' && 'install' in comp) {
      app.use(comp as any)
    }
  })
}

export default { install }
