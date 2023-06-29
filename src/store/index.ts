import { resetSetupStore } from '@/utils/store'
import { createPinia } from 'pinia'
import { App } from 'vue'

export function setupStore(app: App) {
  const store = createPinia()
  store.use(resetSetupStore)

  app.use(store)
}
