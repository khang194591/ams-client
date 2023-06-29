<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center gap-4">
    <IconError403 />
    <RouterLink to="/">
      <NButton type="primary">{{ $t('common.button.goHome') }}</NButton>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import IconError403 from '../icons/IconError403.vue'
</script>
