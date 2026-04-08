import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { mkdirSync, writeFileSync, readdirSync } from 'fs'
import { compile } from 'sass'

const projectRoot = resolve(process.cwd(), '..', '..')
const pkgRoot = resolve(projectRoot, 'packages', 'lgs-ui-vue3')
const outDir = resolve(pkgRoot, 'dist')
const componentsDir = resolve(projectRoot, 'packages/components')

const alias = {
  '@lgs-ui-vue3/components': resolve(projectRoot, 'packages/components'),
  '@lgs-ui-vue3/hooks': resolve(projectRoot, 'packages/hooks'),
  '@lgs-ui-vue3/utils': resolve(projectRoot, 'packages/utils'),
}

function getComponentNames(): string[] {
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules')
    .map((d) => d.name)
}

async function buildFullBundle() {
  console.log('📦 Building full bundle...\n')

  await build({
    root: projectRoot,
    resolve: { alias },
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
        external: ['vue', /^element-plus/],
        output: {
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
          },
          exports: 'named',
        },
      },
      emptyOutDir: true,
    },
  })
}

async function buildESModules() {
  console.log('\n📦 Building ES modules...\n')

  await build({
    root: projectRoot,
    resolve: { alias },
    plugins: [vue()],
    build: {
      outDir: resolve(outDir, 'es'),
      lib: {
        entry: resolve(pkgRoot, 'index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external: ['vue', /^element-plus/],
        output: {
          preserveModules: true,
          preserveModulesRoot: resolve(projectRoot, 'packages'),
          entryFileNames: (chunkInfo) => {
            const name = chunkInfo.name.replace(/\.vue$/, '')
            return `${name}.mjs`
          },
        },
      },
      emptyOutDir: true,
    },
  })
}

async function buildCJSModules() {
  console.log('\n📦 Building CJS modules...\n')

  await build({
    root: projectRoot,
    resolve: { alias },
    plugins: [vue()],
    build: {
      outDir: resolve(outDir, 'lib'),
      lib: {
        entry: resolve(pkgRoot, 'index.ts'),
        formats: ['cjs'],
      },
      rollupOptions: {
        external: ['vue', /^element-plus/],
        output: {
          preserveModules: true,
          preserveModulesRoot: resolve(projectRoot, 'packages'),
          entryFileNames: (chunkInfo) => {
            const name = chunkInfo.name.replace(/\.vue$/, '')
            return `${name}.js`
          },
          exports: 'named',
        },
      },
      emptyOutDir: true,
    },
  })
}

async function buildTheme() {
  console.log('\n🎨 Building theme...')

  const themeOutDir = resolve(outDir, 'theme')
  mkdirSync(themeOutDir, { recursive: true })

  const themeEntry = resolve(projectRoot, 'packages/theme/src/index.scss')
  const fullResult = compile(themeEntry)
  writeFileSync(resolve(themeOutDir, 'index.css'), fullResult.css)
  console.log('  ✅ theme/index.css')

  const baseResult = compile(resolve(projectRoot, 'packages/theme/src/reset.scss'))
  writeFileSync(resolve(themeOutDir, 'base.css'), baseResult.css)
  console.log('  ✅ theme/base.css')

  const componentNames = getComponentNames()
  for (const name of componentNames) {
    const scssPath = resolve(projectRoot, `packages/theme/src/${name}.scss`)
    try {
      const cssResult = compile(scssPath)
      writeFileSync(resolve(themeOutDir, `${name}.css`), cssResult.css)
      console.log(`  ✅ theme/${name}.css`)
    } catch {
      console.warn(`  ⚠️  No theme file for component: ${name}`)
    }
  }
}

async function buildResolver() {
  console.log('\n🔧 Building resolver...\n')

  await build({
    root: projectRoot,
    build: {
      outDir,
      lib: {
        entry: resolve(pkgRoot, 'resolver.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `resolver.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: [],
        output: {
          exports: 'named',
        },
      },
      emptyOutDir: false,
    },
  })
}

async function main() {
  console.log('🔨 Building lgs-ui-vue3...\n')

  await buildFullBundle()
  await buildESModules()
  await buildCJSModules()
  await buildTheme()
  await buildResolver()

  console.log('\n✅ All builds completed!')
  console.log(`📦 Output: ${outDir}`)
}

main().catch((err) => {
  console.error('❌ Build failed:', err)
  process.exit(1)
})
