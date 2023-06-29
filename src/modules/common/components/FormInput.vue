<template>
  <NFormItem :required="required" :label="label" :validation-status="error ? 'error' : undefined" :feedback="error">
    <NInput :value="value" :placeholder="placeholder" @update:value="handleChange" />
  </NFormItem>
</template>

<script setup lang="ts">
interface Props {
  value?: string
  required?: boolean
  label?: string
  error?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  required: false
})

const emit = defineEmits(['update:value'])

function handleChange(val: string) {
  emit('update:value', val)
}
</script>
