<template>
  <NFormItem :required="required" :label="label" :validation-status="error ? 'error' : undefined" :feedback="error">
    <NSelect :value="value" :options="options" :placeholder="placeholder" @update:value="handleChange" />
  </NFormItem>
</template>

<script setup lang="ts">
import { SelectOption } from 'naive-ui'

interface Props {
  value?: string
  options?: SelectOption[]
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
