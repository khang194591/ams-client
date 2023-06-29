import { VNode } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    index?: number
    href?: string
    title: string
    icon?: VNode
    requiresAuth?: boolean
    layout?: 'base' | 'auth' | 'blank'
  }
}
