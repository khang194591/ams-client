import { localStg } from '../storage'

export const getViLocalesFromModules = () => {
  const results: Record<string, object> = {}
  const files = import.meta.glob('/**/modules/**/locales/vi.json', {
    eager: true,
    import: 'default'
  })
  for (const key in files) {
    const module = key.split('/')[3]
    results[module] = files[key] as object
  }
  return results
}

export const getEnLocalesFromModules = () => {
  const results: Record<string, object> = {}
  const files = import.meta.glob('/**/modules/**/locales/en.json', {
    eager: true,
    import: 'default'
  })
  for (const key in files) {
    const module = key.split('/')[3]
    results[module] = files[key] as object
  }
  return results
}

export const getJaLocalesFromModules = () => {
  const results: Record<string, object> = {}
  const files = import.meta.glob('/**/modules/**/locales/ja.json', {
    eager: true,
    import: 'default'
  })
  for (const key in files) {
    const module = key.split('/')[3]
    results[module] = files[key] as object
  }
  return results
}

export const initLanguage: Language = localStg.get('language') || 'en'
