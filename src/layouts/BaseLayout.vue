<template>
  <NLayout has-sider class="h-screen">
    <NLayoutSider
      v-if="!isMobile"
      bordered
      collapse-mode="width"
      :collapsed-width="72"
      :width="256"
      class="px-1"
      show-trigger="arrow-circle"
      :collapsed="commonStore.collapseSidebar"
      @expand="commonStore.setCollapseSidebar(false)"
      @collapse="commonStore.setCollapseSidebar(true)"
    >
      <div class="flex py-4">
        <img :src="Logo" alt="logo" class="h-6 mx-auto" />
      </div>
      <NMenu
        :default-value="router.currentRoute.value.name?.toString()"
        :collapsed="commonStore.collapseSidebar"
        :collapsed-width="64"
        :collapsed-icon-size="24"
        :options="menuOptions"
        @update-value="handleNavigation"
      />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered class="px-6 py-3">
        <NSpace align="center" justify="space-between">
          <div class="inline-flex items-center">
            <div v-if="isMobile">
              <NButton @click="isShowDrawer = true">
                <NIcon :component="IconMenu2" />
              </NButton>
              <NDrawer v-model:show="isShowDrawer" placement="left">
                <NDrawerContent class="-mx-6">
                  <NMenu
                    :default-value="router.currentRoute.value.name?.toString()"
                    :options="menuOptions"
                    @update-value="handleNavigation"
                  />
                </NDrawerContent>
              </NDrawer>
            </div>
            <NBreadcrumb v-else>
              <NBreadcrumbItem>
                <NIcon :component="currentRoute.meta.icon" />
                {{ $t(currentRoute.meta.title) }}
              </NBreadcrumbItem>
              <!-- <NBreadcrumbItem v-for="child in currentRoute.meta">
                <NIcon :component="currentRoute.meta.icon">
                  {{ $t(currentRoute.meta.title) }}
                </NIcon>
              </NBreadcrumbItem> -->
            </NBreadcrumb>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <ToggleFullScreen />
            <ToggleLanguage />
            <NPopover trigger="click">
              <template #trigger>
                <NAvatar class="bg-primary cursor-pointer">😎</NAvatar>
              </template>
              <template #header>
                {{ 'Khang dz' }}
              </template>
              <template #footer>
                <div class="flex gap-1 items-center cursor-pointer hover:text-primary" @click="warningDialog.onClick">
                  <NIcon :component="IconLogout" />
                  {{ $t('auth.action.signOut') }}
                </div>
              </template>
            </NPopover>
          </div>
        </NSpace>
      </NLayoutHeader>
      <NLayoutContent>
        <RouterView></RouterView>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/modules/common'
import ToggleFullScreen from '@/modules/common/components/ToggleFullScreen.vue'
import ToggleLanguage from '@/modules/common/components/ToggleLanguage.vue'
import { localStg, useWarningDialog } from '@/utils'
import { useMediaQuery } from '@vueuse/core'
import { sortBy } from 'lodash'
import { MenuOption } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import { IconLogout, IconMenu2 } from '@tabler/icons-vue'
import Logo from '@/assets/images/logo.png'
import axios from 'axios'

const isMobile = useMediaQuery('(max-width: 640px)')

const warningDialog = useWarningDialog(onSignOut, () => {})

const { t } = useI18n()

const router = useRouter()

const currentRoute = computed(() => router.currentRoute.value)

const commonStore = useCommonStore()

const isShowDrawer = ref(false)

const menuOptions = computed<MenuOption[]>(() =>
  sortBy(
    router.getRoutes().filter((item) => item.meta.layout === 'base'),
    'meta.index'
  ).map((item) =>
    item.children.length
      ? {
          key: item.name?.toString(),
          label: () =>
            h(RouterLink, { to: { name: item.name } }, { default: () => (item.meta.title ? t(item.meta.title) : '?') }),
          icon: () => item.meta.icon,
          children: item.children.map((subItem) => ({
            key: item.name?.toString(),
            label: () =>
              h(
                RouterLink,
                { to: { name: subItem.name } },
                { default: () => (subItem?.meta?.title ? t(subItem.meta.title) : '?') }
              ),
            icon: () => subItem?.meta?.icon
          }))
        }
      : {
          key: item.name?.toString(),
          label: () =>
            h(RouterLink, { to: { name: item.name } }, { default: () => (item.meta.title ? t(item.meta.title) : '?') }),
          icon: () => item.meta.icon
        }
  )
)

function handleNavigation(val: string) {
  if (isShowDrawer.value) {
    isShowDrawer.value = false
  }
  router.push({ name: val })
}

async function onSignOut() {
  const response = await axios.delete('/auth/sign-out')
  if (response.success) {
    localStg.clear()
    router.push({ name: 'sign-in' })
  } else {
    console.log(response.message)
  }
}
</script>
