<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center bg-primary bg-opacity-10">
    <div class="absolute top-5 right-5">
      <div class="bg-white rounded-full">
        <!-- <ToggleLanguage /> -->
      </div>
    </div>
    <div class="shadow px-8 py-6 bg-white rounded-lg md:min-w-[420px]">
      <img :src="Logo" alt="logo" class="h-8 my-6 mx-auto" />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/logo.png'
//   import ToggleLanguage from '@/modules/common/components/ToggleLanguage.vue'
</script>
