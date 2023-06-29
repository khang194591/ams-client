<template>
  <div class="p-4">
    <div class="flex flex-row justify-between">
      <div class="inline-flex gap-2">
        <NButton @click="store.download">
          <NIcon :component="renderIcon(IconDownload)" />
        </NButton>
        <NUpload :default-upload="false" @change="handleChange">
          <NButton>
            <NIcon :component="renderIcon(IconUpload)" />
          </NButton>
        </NUpload>
        <NButton type="primary" @click="handleAdd">
          <NIcon :component="renderIcon(IconPlus)" />
        </NButton>
      </div>
    </div>
    <UserTable />
    <UserForm />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/modules/common'
import { UploadFileInfo } from 'naive-ui'
import UserTable from '../components/UserTable.vue'
import { useUserStore } from '../store'
import { IconDownload } from '@tabler/icons-vue'
import { IconUpload } from '@tabler/icons-vue'
import { IconPlus } from '@tabler/icons-vue'
import UserForm from '../components/UserForm.vue'
import { renderIcon } from '@/utils'

onMounted(async () => {
  store.clearQueryString()
  await commonStore.fetchRoleOptions()
  await store.fetchUserList()
})

const store = useUserStore()

const commonStore = useCommonStore()

async function handleChange(options: { file: UploadFileInfo; fileList: Array<UploadFileInfo>; event?: Event }) {
  if (options.file.file) {
    await store.upload(options.file.file)
  }
}

function handleAdd() {
  store.userForm.open = true
  store.userForm.mode = 'create'
}
</script>
