import { LocaleObject, ValidationError, printValue } from 'yup'
import {
  ArrayLocale,
  BooleanLocale,
  DateLocale,
  MixedLocale,
  NumberLocale,
  ObjectLocale,
  StringLocale,
  TupleLocale
} from '../types'
import { parseYupMessage } from './yup.utils'

export const mixed: Required<MixedLocale> = {
  default: (params) => parseYupMessage(params, 'mixed.default'),
  required: (params) => parseYupMessage(params, 'mixed.required'),
  defined: (params) => parseYupMessage(params, 'mixed.defined'),
  notNull: (params) => parseYupMessage(params, 'mixed.notNull'),
  oneOf: (params) => parseYupMessage(params, 'mixed.oneOf', 'oneOf'),
  notOneOf: (params) => parseYupMessage(params, 'mixed.notOneOf', 'notOneOf'),
  notType: ({ path, type, value, originalValue }) => {
    const castMsg =
      originalValue != null && originalValue !== value
        ? ` (cast from the value \`${printValue(originalValue, true)}\`).`
        : '.'

    return type !== 'mixed'
      ? `${path} must be a \`${type}\` type, ` + `but the final value was: \`${printValue(value, true)}\`` + castMsg
      : `${path} must match the configured type. ` + `The validated value was: \`${printValue(value, true)}\`` + castMsg
  }
}

export const string: Required<StringLocale> = {
  length: (params) => parseYupMessage(params, 'string.length'),
  min: (params) => parseYupMessage(params, 'string.min'),
  max: (params) => parseYupMessage(params, 'string.max'),
  matches: (params) => parseYupMessage(params, 'string.matches'),
  email: (params) => parseYupMessage(params, 'string.email'),
  url: (params) => parseYupMessage(params, 'string.url'),
  uuid: (params) => parseYupMessage(params, 'string.uuid'),
  trim: (params) => parseYupMessage(params, 'string.trim'),
  lowercase: (params) => parseYupMessage(params, 'string.lowercase'),
  uppercase: (params) => parseYupMessage(params, 'string.uppercase')
}

export const number: Required<NumberLocale> = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer'
}

export const date: Required<DateLocale> = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}'
}

export const boolean: BooleanLocale = {
  isValue: '${path} field must be ${value}'
}

export const object: Required<ObjectLocale> = {
  noUnknown: '${path} field has unspecified keys: ${unknown}'
}

export const array: Required<ArrayLocale> = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must have ${length} items'
}

export const tuple: Required<TupleLocale> = {
  notType: (params) => {
    const { path, value, spec } = params
    const typeLen = spec.types.length
    if (Array.isArray(value)) {
      if (value.length < typeLen)
        return `${path} tuple value has too few items, expected a length of ${typeLen} but got ${
          value.length
        } for value: \`${printValue(value, true)}\``
      if (value.length > typeLen)
        return `${path} tuple value has too many items, expected a length of ${typeLen} but got ${
          value.length
        } for value: \`${printValue(value, true)}\``
    }

    return ValidationError.formatError(mixed.notType, params)
  }
}

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
}) as LocaleObject
