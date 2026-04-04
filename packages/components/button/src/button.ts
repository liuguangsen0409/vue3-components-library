import type { ExtractPropTypes } from 'vue'
import { buttonProps as elButtonProps, buttonEmits as elButtonEmits } from 'element-plus'

// 继承 Element Plus Button 的所有 Props 和 Emits
export const buttonProps = elButtonProps
export const buttonEmits = elButtonEmits

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
