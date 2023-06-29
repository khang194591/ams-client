<template>
  <div class="border-slate-200 border rounded-lg pb-3">
    <div class="flex justify-between px-4 py-3">
      <NInputGroup class="max-w-xs">
        <NInput clearable size="small" v-model:value="keyword" @keyup.enter="handleSearch" @clear="handleClearSearch" />
        <NButton size="small" type="primary" :disabled="loading" @click="handleSearch">
          <IconSearch :size="16" />
        </NButton>
      </NInputGroup>
      <NButton quaternary circle size="small" :disabled="loading" @click="emit('reload')">
        <IconRefresh :size="16" :class="loading ? 'animate-spin' : ''" />
      </NButton>
    </div>
    <NDataTable
      remote
      size="small"
      :theme-overrides="themeOverrides.DataTable"
      pagination-behavior-on-filter="first"
      :single-line="false"
      :bordered="false"
      :columns="columns"
      :data="tableData.items"
      :loading="loading"
      :row-key="(item) => item.id"
      @update-sorter="handleUpdateSorter"
      @update:filters="handleUpdateFilter"
      @update-checked-row-keys="handleUpdateCheckedRow"
      :pagination="{
        showSizePicker: true,
        disabled: loading,
        itemCount: tableData.total,
        page: page,
        pageSize: pageSize,
        pageSizes: pageSizes,
        onUpdatePage: handleUpdatePage,
        onUpdatePageSize: handleUpdatePageSize
      }"
    ></NDataTable>
  </div>
</template>

<script setup lang="ts">
import {
  DataTableColumns,
  DataTableFilterState,
  DataTableRowKey,
  DataTableSortState,
  GlobalThemeOverrides
} from 'naive-ui'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '../constants'
import { IconSearch } from '@tabler/icons-vue'
import { useField } from 'vee-validate'
import { IconRefresh } from '@tabler/icons-vue'

interface Props {
  loading: boolean
  columns: DataTableColumns<any>
  tableData: PaginatedDto<any>

  page?: number
  pageSize?: number
  pageSizes?: number[]
}

withDefaults(defineProps<Props>(), {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  pageSizes: () => DEFAULT_PAGE_SIZE_OPTIONS
})

const { value: keyword } = useField<string>('keyword')

const emit = defineEmits<{
  reload: []
  search: [keyword: string]
  'change-page': [page: number]
  'change-page-size': [size: number]

  'change-sort': [sort: SortOption]
  'change-filter': [filter: DataTableFilterState]
  'change-selection': [rowKeys: DataTableRowKey[]]
}>()

function handleUpdatePage(page: number) {
  emit('change-page', page)
  emit('reload')
}

function handleUpdatePageSize(size: number) {
  emit('change-page-size', size)
  emit('reload')
}

function handleUpdateSorter(options: DataTableSortState) {
  const key = options.columnKey.toString()
  const order = options.order ? (options.order.replace('end', '') as 'asc' | 'desc') : undefined
  const sort: SortOption = { key, order }
  emit('change-sort', sort)
  emit('reload')
}

function handleUpdateFilter(filters: DataTableFilterState) {
  emit('change-filter', filters)
  emit('reload')
}

function handleUpdateCheckedRow(rowKeys: DataTableRowKey[]) {
  emit('change-selection', rowKeys)
}

function handleSearch() {
  emit('search', keyword.value)
  emit('reload')
}

function handleClearSearch() {
  emit('search', '')
  emit('reload')
}

const themeOverrides: GlobalThemeOverrides = {
  DataTable: {
    borderRadius: 0,
    thColor: '#f1f5f9',
    thColorHover: '#e2e8f0',
    paginationMargin: '12px 16px 0px'
  }
}
</script>
