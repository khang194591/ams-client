import { defineStore } from 'pinia'
import { initLanguage } from '@/utils'
import { FilterOption } from 'naive-ui/es/data-table/src/interface'
import { Status } from '@/modules/user/types'
import axios from 'axios'
import { RoleDto } from '@/modules/role/types'

interface PublicRole extends Omit<RoleDto, 'permissions'> {}

const { t } = i18n

export const useCommonStore = defineStore('common', {
  state: () => ({
    collapseSidebar: false,
    language: initLanguage as Language,
    userStatusOptions: Object.values(Status).map((item) => ({ value: item, label: item })) as FilterOption[],
    roleOptions: [] as FilterOption[]
  }),
  getters: {
    genderOptions() {
      return Object.values(Gender).map((item) => ({ label: item, value: item }))
    }
  },
  actions: {
    setLanguage(val: Language) {
      this.language = val
    },
    setCollapseSidebar(val: boolean) {
      this.collapseSidebar = val
    },
    async fetchRoleOptions() {
      const response = await axios.get<PaginatedDto<PublicRole>>('public/role')
      if (response.success) {
        this.roleOptions = response.data.items.map((item) => ({ value: item.id, label: item.title }))
      }
    }
  }
})
