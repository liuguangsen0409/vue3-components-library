<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  path: string
}>()

const showSource = ref(false)

const modules: Record<string, any> = import.meta.glob('../../../examples/**/*.vue', { eager: true })
const sources: Record<string, string> = import.meta.glob('../../../examples/**/*.vue', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const normalizePath = (path: string) => {
  const suffix = `examples/${props.path}.vue`
  return Object.keys(modules).find((k) => k.endsWith(suffix)) || ''
}

const demoComponent = computed(() => {
  const key = normalizePath(props.path)
  return key ? modules[key]?.default : null
})

const sourceCode = computed(() => {
  const suffix = `examples/${props.path}.vue`
  const key = Object.keys(sources).find((k) => k.endsWith(suffix)) || ''
  return key ? sources[key] : ''
})

const toggleSource = () => {
  showSource.value = !showSource.value
}
</script>

<template>
  <ClientOnly>
    <div class="vp-demo">
      <div class="vp-demo__preview">
        <component :is="demoComponent" v-if="demoComponent" />
      </div>
      <div class="vp-demo__footer">
        <button class="vp-demo__toggle" @click="toggleSource">
          {{ showSource ? '隐藏代码' : '查看代码' }}
        </button>
      </div>
      <div v-show="showSource" class="vp-demo__source">
        <pre><code>{{ sourceCode }}</code></pre>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.vp-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;

  &__preview {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  &__footer {
    border-top: 1px dashed var(--vp-c-divider);
    padding: 8px;
    text-align: center;
  }

  &__toggle {
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    font-size: 13px;
    padding: 4px 16px;
    border-radius: 4px;
    transition: all 0.25s;

    &:hover {
      color: var(--vp-c-brand-1);
      background: var(--vp-c-bg-soft);
    }
  }

  &__source {
    border-top: 1px dashed var(--vp-c-divider);

    pre {
      margin: 0;
      padding: 20px 24px;
      background: var(--vp-c-bg-soft);
      overflow-x: auto;

      code {
        font-family: var(--vp-font-family-mono);
        font-size: 13px;
        line-height: 1.7;
        color: var(--vp-c-text-1);
        white-space: pre;
      }
    }
  }
}
</style>
