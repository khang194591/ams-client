export {}

declare global {
  type Language = 'en' | 'vi'

  type SortOrder = 'asc' | 'desc' | false

  type FormMode = 'create' | 'update'

  interface SortOption {
    key?: string
    order?: SortOrder
  }

  interface QueryString {
    keyword?: string

    sortBy?: string
    sortOrder?: SortOrder

    page?: number
    take?: number
  }

  interface PaginatedDto<T> {
    items: T[]
    total: number
    totalPage?: number
  }

  interface FormModal<T> {
    id?: number
    open?: boolean
    data?: T
    mode?: FormMode
    loading?: boolean
  }
}
