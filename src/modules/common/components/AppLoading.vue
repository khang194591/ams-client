<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div class="inline-flex items-center gap-4 mb-12">
      <img :src="Logo" class="h-12" />
      <code class="text-5xl text-primary font-bold">{{ VITE_APP_TITLE }}</code>
    </div>
    <div class="lds-hourglass"></div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/logo.png'

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<style scoped>
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #6366f1;
  border-color: #6366f1 transparent #6366f1 transparent;
  animation: lds-hourglass 1.2s infinite;
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(1800deg);
  }
}
</style>
