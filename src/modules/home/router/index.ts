import { renderIcon } from '@/utils'
import { IconDashboard } from '@tabler/icons-vue'
import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: {
      index: 1,
      title: 'common.module.label.home',
      layout: 'base',
      icon: renderIcon(IconDashboard),
      requiresAuth: true
    }
  }
] as RouteRecordRaw[]
