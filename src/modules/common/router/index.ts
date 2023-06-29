import { i18n } from '@/locales'
import { RouteRecordRaw } from 'vue-router'

const { t } = i18n.global

export default [
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/PageError404.vue'),
    meta: {
      title: t('common.module.label.404'),
      layout: 'blank'
    }
  },
  {
    name: 'forbidden',
    path: 'forbidden',
    component: () => import('../pages/PageError403.vue'),
    meta: {
      title: t('common.module.label.403'),
      layout: 'blank'
    }
  }
] as RouteRecordRaw[]
