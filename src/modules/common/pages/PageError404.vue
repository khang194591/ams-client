<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center gap-4">
    <IconError404 />
    <RouterLink to="/">
      <NButton type="primary">{{ $t('common.button.goHome') }}</NButton>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import IconError404 from '../icons/IconError404.vue'
</script>
