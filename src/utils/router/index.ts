import { concat, flatten, forEach } from 'lodash'
import { RouteRecordRaw } from 'vue-router'

const getRoutesFromModules = async () => {
  const results: Record<string, RouteRecordRaw | RouteRecordRaw[]> = {}
  const files = import.meta.glob('/**/modules/**/router/index.ts', {
    import: 'default'
  })
  for (const key in files) {
    const module = key.split('/')[3]
    results[module] = (await files[key]()) as RouteRecordRaw
  }
  let routes: RouteRecordRaw[] = []

  forEach(results, (module) => {
    routes = concat(routes, module)
  })
  return flatten(routes)
}

const transformRoutesToLayoutRoutes = async (): Promise<RouteRecordRaw[]> => {
  const routes = await getRoutesFromModules()

  const authRoutes = routes.filter((route) => route.meta?.layout === 'auth')
  const blankRoutes = routes.filter((route) => route.meta?.layout === 'blank')
  const baseRoutes = routes.filter((route) => route.meta?.layout === 'base')
  return [
    {
      path: '/',
      component: () => import('@/layouts/BaseLayout.vue'),
      children: baseRoutes
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: authRoutes
    },
    {
      path: '/static',
      component: () => import('@/layouts/BlankLayout.vue'),
      children: blankRoutes
    }
  ]
}

export const modulesRoutes = transformRoutesToLayoutRoutes()
