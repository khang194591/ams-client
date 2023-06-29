<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NThemeEditor>
      <NMessageProvider>
        <NDialogProvider>
          <NSpin :show="!online">
            <RouterView v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </RouterView>
            <template #icon>
              <NIcon :component="renderIcon(IconLoader2)" />
            </template>
            <template #description>Disconnected...</template>
          </NSpin>
        </NDialogProvider>
      </NMessageProvider>
    </NThemeEditor>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { IconLoader2 } from '@tabler/icons-vue'
import { useOnline } from '@vueuse/core'
import { NThemeEditor } from 'naive-ui'
import { themeOverrides } from './assets/theme'
import { renderIcon } from './utils'

const online = useOnline()
</script>
