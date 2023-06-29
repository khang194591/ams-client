import { createApp } from 'vue'

import App from './App.vue'
import AppLoading from './modules/common/components/AppLoading.vue'

import { setupAssets } from './assets'
import { setupI18n } from './locales'
import { setupPlugin } from './plugins'
import { setupRoutes } from './router'
import { setupStore } from './store'

async function setupApp() {
  setupAssets()

  const appLoading = createApp(AppLoading)

  appLoading.mount('#app-loading')

  const app = createApp(App)

  setupPlugin()

  setupStore(app)

  setupI18n(app)

  await setupRoutes(app)

  appLoading.unmount()

  app.mount('#app')
}

setupApp()
