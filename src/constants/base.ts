import { number, object, string } from 'yup'

export const TIME_FORMAT = 'HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'

export const baseUniqueKeys = ['id'] as const

export const baseSortByKeys = ['createdAt', 'updatedAt'] as const

export const sortOrderKeys = ['asc', 'desc'] as const

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_PAGE_SIZES = [10, 25, 100]

export const baseQuerySchema = object({
  keyword: string().trim(),
  sortBy: string(),
  sortOrder: string().oneOf(sortOrderKeys),
  page: number(),
  take: number()
})
