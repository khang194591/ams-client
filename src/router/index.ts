import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { modulesRoutes } from '@/utils'
import { setupAuthMiddleware } from './middlewares/auth'

export const setupRoutes = async (app: App) => {
  const routes = await modulesRoutes
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

  setupAuthMiddleware(router)

  app.use(router)
}
