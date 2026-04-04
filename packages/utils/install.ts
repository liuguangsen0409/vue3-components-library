import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Record<string, any>>(comp: T): SFCWithInstall<T> => {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    const { name } = comp
    if (name) {
      app.component(name, comp)
    }
  }
  return comp as SFCWithInstall<T>
}
