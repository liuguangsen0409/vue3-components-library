import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { mkdirSync, writeFileSync } from 'fs'
import { compile } from 'sass'

const projectRoot = resolve(process.cwd(), '..', '..')
const pkgRoot = resolve(projectRoot, 'packages', 'lgs-ui-vue3')
const outDir = resolve(pkgRoot, 'dist')

async function buildLib() {
  console.log('🔨 Building lgs-ui-vue3...\n')

  await build({
    root: projectRoot,
    resolve: {
      alias: {
        '@lgs-ui-vue3/components': resolve(projectRoot, 'packages/components'),
        '@lgs-ui-vue3/hooks': resolve(projectRoot, 'packages/hooks'),
        '@lgs-ui-vue3/utils': resolve(projectRoot, 'packages/utils'),
      },
    },
    plugins: [vue()],
    build: {
      outDir,
      lib: {
        entry: resolve(pkgRoot, 'index.ts'),
        name: 'LgsUiVue3',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: { vue: 'Vue' },
          exports: 'named',
        },
      },
      emptyOutDir: true,
    },
  })

  console.log('\n🎨 Building theme...')

  const themeEntry = resolve(projectRoot, 'packages/theme/src/index.scss')
  const result = compile(themeEntry)

  const themeOutDir = resolve(outDir, 'theme')
  mkdirSync(themeOutDir, { recursive: true })
  writeFileSync(resolve(themeOutDir, 'index.css'), result.css)

  console.log('✅ Build completed!')
  console.log(`📦 Output: ${outDir}`)
}

buildLib().catch((err) => {
  console.error('❌ Build failed:', err)
  process.exit(1)
})
