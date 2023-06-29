<template>
  <NModal
    :show="show"
    preset="card"
    size="large"
    class="w-screen h-screen rounded-none sm:rounded-lg sm:h-auto sm:w-1/2"
    :title="$t(`user.formMode.${store.userForm.mode}`)"
    @close="handleClose"
    @update-show="handleClose"
  >
    <NForm class="grid sm:grid-cols-2 gap-x-4">
      <FormInput
        required
        v-model:value="firstName"
        :label="$t('user.form.firstName.label')"
        :placeholder="$t('user.form.firstName.placeholder')"
        :error="form.errors.value.firstName"
      />
      <FormInput
        required
        v-model:value="lastName"
        :label="$t('user.form.lastName.label')"
        :placeholder="$t('user.form.lastName.placeholder')"
        :error="form.errors.value.lastName"
      />
      <FormInput
        required
        v-model:value="email"
        :label="$t('user.form.email.label')"
        :placeholder="$t('user.form.email.placeholder')"
        :error="form.errors.value.email"
      />
      <FormInputDate
        v-model:value="birthDay"
        :label="$t('user.form.birthDay.label')"
        :placeholder="$t('user.form.birthDay.placeholder')"
        :error="form.errors.value.birthDay"
      />
      <FormSelect
        v-model:value="gender"
        :label="$t('user.form.gender.label')"
        :placeholder="$t('user.form.gender.placeholder')"
        :error="form.errors.value.gender"
        :options=""
      />
    </NForm>
    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton @click="handleClose">{{ $t('common.button.cancel') }}</NButton>
        <NButton :loading="store.userForm.loading" type="primary" @click="form.onSubmit">{{
          $t('common.button.submit')
        }}</NButton>
      </div>
    </template>
  </NModal>
</template>

<script setup lang="ts">
import { useUserStore } from '../store'
import { useUserForm } from '../composables/form'
import FormInput from '@/modules/common/components/FormInput.vue'
import { storeToRefs } from 'pinia'
import FormInputDate from '@/modules/common/components/FormInputDate.vue'
import FormSelect from '@/modules/common/components/FormSelect.vue'

const store = useUserStore()

const form = useUserForm()

const show = computed(() => store.userForm.open)

const { userForm } = storeToRefs(store)

const avatarUrl = form.useFieldModel('avatarId')
const firstName = form.useFieldModel('firstName')
const lastName = form.useFieldModel('lastName')
const email = form.useFieldModel('email')
const phone = form.useFieldModel('phone')
const birthDay = form.useFieldModel('birthDay')
const gender = form.useFieldModel('gender')
const address = form.useFieldModel('address')
const bank = form.useFieldModel('bank')
const bankAccount = form.useFieldModel('bankAccount')
const citizenId = form.useFieldModel('citizenId')
const status = form.useFieldModel('status')
const roleId = form.useFieldModel('roleId')
const province = form.useFieldModel('province')
const district = form.useFieldModel('district')
const ward = form.useFieldModel('ward')

const genderOptions = computed(() => publicStore.genderOptions)

function handleClose() {
  store.userForm.open = false
  store.userForm.data = undefined
}

watch(userForm.value, () => {
  const { id, open, data } = userForm.value
  if (id && open && data) {
    form.setForm(userForm.value.data)
  } else {
    form.setForm()
  }
})
</script>
