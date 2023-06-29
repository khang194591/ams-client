<template>
  <div class="p-4">
    <BaseTable
      :loading="store.loading"
      :columns="columns"
      :table-data="tableData"
      :page="store.queryString.page"
      :page-size="store.queryString.take"
      @reload="store.fetchUserList"
      @search="onSearch"
      @change-page="onChangePage"
      @change-page-size="onChangePageSize"
      @change-sort="onChangeSort"
      @change-filter="onChangeFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/modules/common'
import BaseTable from '@/modules/common/components/BaseTable.vue'
import { DEFAULT_PAGE } from '@/modules/common/constants'
import { renderIcon } from '@/utils'
import { IconEdit, IconTrash } from '@tabler/icons-vue'
import axios from 'axios'
import { DataTableColumns, DataTableFilterState, NAvatar, NButton, NTag, NTooltip } from 'naive-ui'
import { capitalize } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../store'
import { Status, UserDto } from '../types'

onMounted(async () => {})

const { t } = useI18n()

const dialog = useDialog()

const store = useUserStore()

const commonStore = useCommonStore()

const tableData = computed(() => store.userTableData)

const columns = computed<DataTableColumns<UserDto>>(() => [
  {
    title: capitalize(t('user.entity')),
    key: 'firstName',
    sorter: 'default',
    fixed: 'left',
    render: (rowData: UserDto) =>
      h('div', { class: 'w-20 sm:w-64 flex flex-row justify-center sm:justify-normal gap-2' }, [
        h(
          NAvatar,
          { class: 'bg-primary', src: `${import.meta.env.VITE_APP_API_URL}/public/file/${rowData.avatarId}` },
          { default: () => rowData.lastName.charAt(0) + rowData.firstName.charAt(0) }
        ),
        h('div', { class: 'sm:flex flex-col justify-between hidden' }, [
          h('span', { class: 'font-semibold' }, { default: () => rowData.lastName.concat(' ', rowData.firstName) }),
          h('span', { class: 'text-xs' }, { default: () => rowData.email })
        ])
      ])
  },
  {
    title: t('user.form.phone.label'),
    key: 'phone',
    width: 200
  },
  {
    title: t('user.form.birthDay.label'),
    key: 'birthDay',
    width: 200
  },
  {
    title: t('user.form.status.label'),
    key: 'status',
    align: 'center',
    width: 180,
    filterMultiple: true,
    filterOptionValues: store.queryString.status,
    filterOptions: commonStore.userStatusOptions,
    filter: true,
    render: (rowData: UserDto) =>
      h(
        NTag,
        {
          round: true,
          type: rowData.status === Status.active ? 'success' : rowData.status === Status.pending ? 'warning' : 'error'
        },
        { default: () => t(`user.status.${rowData.status}`) }
      )
  },
  {
    title: t('user.form.role.label'),
    key: 'role.title',
    align: 'center',
    width: 180,
    filterMultiple: true,
    filterOptionValues: store.queryString.role,
    filterOptions: commonStore.roleOptions,
    filter: true,
    render: (rowData: UserDto) => h(NTag, { type: 'default' }, { default: () => rowData.role?.title })
  },
  {
    title: t('common.button.action'),
    key: 'action',
    align: 'center',
    fixed: 'right',
    render: (row) =>
      h('div', { class: 'flex flex-row gap-2' }, [
        h(
          NTooltip,
          { trigger: 'hover' },
          {
            default: () => t('common.button.edit'),
            trigger: () =>
              h(
                NButton,
                {
                  circle: true,
                  quaternary: true,
                  type: 'primary',
                  onClick: () => {
                    const { id, ...data } = row
                    store.userForm.id = id
                    store.userForm.mode = 'update'
                    store.userForm.data = data
                    store.userForm.open = true
                  }
                },
                { icon: () => renderIcon(IconEdit) }
              )
          }
        ),
        h(
          NTooltip,
          { trigger: 'hover' },
          {
            default: () => t('common.button.delete'),
            trigger: () =>
              h(
                NButton,
                {
                  circle: true,
                  quaternary: true,
                  type: 'error',
                  onClick: () => {
                    dialog.warning({
                      title: '',
                      positiveText: t('common.button.ok'),
                      negativeText: t('common.button.cancel'),
                      onPositiveClick: () => onDelete(row.id)
                    })
                  }
                },
                { icon: () => renderIcon(IconTrash) }
              )
          }
        )
      ])
  }
])

async function onSearch(keyword: string) {
  store.patchQueryString({ page: DEFAULT_PAGE, keyword })
}

async function onChangePage(page: number) {
  store.patchQueryString({ page: page })
}

async function onChangePageSize(size: number) {
  store.patchQueryString({ page: DEFAULT_PAGE, take: size })
}

async function onChangeSort({ key, order }: SortOption) {
  store.patchQueryString({ sortOrder: order, sortBy: key })
}

async function onChangeFilter(filters: DataTableFilterState) {
  store.patchQueryString({ page: DEFAULT_PAGE, ...filters })
}

async function onDelete(id: number) {
  store.setLoading(true)
  await axios.delete(`user/${id}`)
  await store.fetchUserList()
}
</script>
