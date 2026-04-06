import type { ExtractPropTypes, PropType } from 'vue'

export const footerProps = {
  height: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
} as const

export type FooterProps = ExtractPropTypes<typeof footerProps>