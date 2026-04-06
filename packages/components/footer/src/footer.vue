<template>
  <el-footer v-bind="$attrs" :class="ns.b()">
    <p>
      xx 公司 ©
      <span>{{ currentYear }}</span>
    </p>
    <slot />
  </el-footer>
</template>

<script lang="ts" setup>
import { useNamespace } from "@lgs-ui-vue3/hooks"

defineOptions({
  name: "LgsFooter",
  inheritAttrs: false,
})

const currentYear = new Date().getFullYear()

const ns = useNamespace("footer")
</script>
