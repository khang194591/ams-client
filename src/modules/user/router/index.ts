import { renderIcon } from '@/utils'
import { RouteRecordRaw } from 'vue-router'
import { IconUserCheck } from '@tabler/icons-vue'
export default [
  {
    path: 'user',
    name: 'user',
    component: () => import('../pages/UserPage.vue'),
    meta: {
      index: 2,
      title: 'common.module.label.user',
      layout: 'base',
      icon: renderIcon(IconUserCheck),
      requiresAuth: true
    }
  }
] as RouteRecordRaw[]
