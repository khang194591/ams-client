import { getEnLocalesFromModules, getViLocalesFromModules, initLanguage } from '@/utils'
import { App } from 'vue'
import { createI18n } from 'vue-i18n'

const fallbackLocale: Language = 'en'

export const i18n = createI18n({
  legacy: false,
  locale: initLanguage,
  fallbackLocale,
  messages: { en: getEnLocalesFromModules(), vi: getViLocalesFromModules() }
})

export function setupI18n(app: App) {
  app.use(i18n)
}
