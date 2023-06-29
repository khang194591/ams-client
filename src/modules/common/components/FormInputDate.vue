<template>
  <NFormItem :required="required" :label="label" :validation-status="error ? 'error' : undefined" :feedback="error">
    <NDatePicker
      type="date"
      class="w-full"
      :value="value ? dayjs(value).toDate().getTime() : null"
      :placeholder="placeholder"
      value-format="yyyy-MM-dd"
      @update:value="handleChange"
    />
  </NFormItem>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  value?: number | string | null
  required?: boolean
  label?: string
  error?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  required: false
})

const emit = defineEmits(['update:value'])

function handleChange(val?: number | string | null) {
  emit('update:value', dayjs(val).format('YYYY/MM/DD'))
}
</script>
