import { initQueryString } from '@/modules/common/constants'
import axios from 'axios'
import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'
import { userSchema } from '../constants/schema'
import { UserDto, UserQueryString } from '../types'

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    queryString: initQueryString as UserQueryString,
    userTableData: { items: [], total: 0 } as PaginatedDto<UserDto>,
    userForm: { mode: 'create', open: false } as FormModal<Partial<UserDto>>
  }),
  actions: {
    setLoading(val: boolean) {
      this.loading = val
    },
    patchQueryString(val: Partial<UserQueryString>) {
      this.queryString = { ...this.queryString, ...val }
    },
    clearQueryString() {
      this.queryString = initQueryString
    },
    async fetchUserList() {
      this.loading = true
      const response = await axios.get<PaginatedDto<UserDto>>('/user', { params: this.queryString })
      if (response.success) {
        this.userTableData = response.data
      } else {
        console.error(response.message)
      }
      this.loading = false
    },
    async download() {
      const response = await axios.get<PaginatedDto<UserDto>>('/user')
      const items: Partial<UserDto>[] = []
      if (response.success) {
        response.data.items.map((item) => {
          try {
            const validated = userSchema.cast(item, { stripUnknown: true })
            items.push({
              ...validated,
              email: validated.email
            } as UserDto)
          } catch (error) {
            console.log(error)
          }
        })
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(items, {})
        XLSX.utils.book_append_sheet(workbook, worksheet)
        XLSX.writeFile(workbook, `user-${Date.now()}.xlsx`)
      }
    },
    async upload(file: File) {
      const workbook = XLSX.read(await file.arrayBuffer())
      const items = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1'])
      const response = await axios.post('/user/bulk', { items })
      if (response.success) {
        console.log('oke')
      } else {
        console.log('failed')
      }
    }
  }
})
