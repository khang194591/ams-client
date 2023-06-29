import { i18n } from '@/locales'
import { RouteRecordRaw } from 'vue-router'

const { t } = i18n.global

export default [
  {
    name: 'sign-in',
    path: 'sign-in',
    component: () => import('../pages/SignIn.vue'),
    meta: {
      title: t('common.module.label.signIn'),
      layout: 'auth'
    }
  },
  {
    name: 'sign-up',
    path: 'sign-up',
    component: () => import('../pages/SignUp.vue'),
    meta: {
      title: t('common.module.label.signUp'),
      layout: 'auth'
    }
  }
] as RouteRecordRaw[]
