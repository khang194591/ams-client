<template>
  <NDropdown :options="options" trigger="hover" :value="commonStore.language" @select="handleSelect">
    <NButton quaternary circle>
      <NIcon :size="20" :component="renderIcon(IconLanguageHiragana)" />
    </NButton>
  </NDropdown>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/modules/common'
import { localStg, renderIcon } from '@/utils'
import { IconLanguageHiragana } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'

const commonStore = useCommonStore()

const { locale: i18nLocale } = useI18n()

const options = [
  {
    label: 'English',
    key: 'en'
  },
  {
    label: 'Tiếng Việt',
    key: 'vi'
  }
]

const handleSelect = (key: Language) => {
  i18nLocale.value = key
  localStg.set('language', key)
  commonStore.setLanguage(key)
}
</script>
