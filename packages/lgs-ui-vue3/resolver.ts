export interface LgsUiResolverOptions {
  importStyle?: boolean
}

const PKG_NAME = '@liuguangsen0409/vue3-components-library'

function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function LgsUiResolver(options: LgsUiResolverOptions = {}) {
  const { importStyle = true } = options

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (!name.startsWith('Lgs')) return

      const partialName = kebabCase(name.slice(3))

      return {
        name,
        from: `${PKG_NAME}/es/components/${partialName}`,
        sideEffects: importStyle
          ? `${PKG_NAME}/theme/${partialName}.css`
          : undefined,
      }
    },
  }
}
