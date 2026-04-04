<template>
  <el-button v-bind="$attrs" :class="ns.b()">
    <template v-for="(_, name) in $slots" #[name]="slotData" :key="name">
      <slot :name="name" v-bind="slotData ?? {}" />
    </template>
  </el-button>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { useNamespace } from '@lgs-ui-vue3/hooks'

defineOptions({
  name: 'LgsButton',
  inheritAttrs: false,
})

const ns = useNamespace('button')
</script>
