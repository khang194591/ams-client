import { i18n } from '@/locales'
import { capitalize } from 'lodash'

export function parseYupMessage(params: any, message: string, schemaType?: string) {
  const { t } = i18n.global
  const { path, type, value, values, originalValue, length, min, max, less, more, unknown, spec, regex } = params
  if (!schemaType) {
    return capitalize(t(`common.yup.message.${message}`, { path: t(`common.yup.field.${path}`) }))
  } else {
    switch (schemaType) {
      case 'oneOf':
      case 'notOneOf':
        return capitalize(t(`common.yup.message.${message}`, { path: t(`common.yup.field.${path}`, values) }))
      case 'length':
        return capitalize(t(`common.yup.message.${message}`, { path: t(`common.yup.field.${path}`, length) }))
      case 'min':
        return capitalize(t(`common.yup.message.${message}`, { path: t(`common.yup.field.${path}`, min) }))
      case 'max':
        return capitalize(t(`common.yup.message.${message}`, { path: t(`common.yup.field.${path}`, max) }))
      case 'matches':
        return capitalize(t(`common.yup.message.${message}`, { path: t(`common.yup.field.${path}`, regex) }))
      default:
        break
    }
  }
}
