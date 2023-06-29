<template>
  <NTooltip>
    <template #trigger>
      <NButton quaternary circle @click="toggle">
        <NIcon :size="20" :component="renderIcon(isFullscreen ? IconArrowsMinimize : IconArrowsMaximize)" />
      </NButton>
    </template>
    {{ $t(isFullscreen ? 'common.button.exitFullScreen' : 'common.button.fullScreen') }}
  </NTooltip>
</template>

<script setup lang="ts">
import { renderIcon } from '@/utils'
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-vue'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>
