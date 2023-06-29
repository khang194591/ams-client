<template>
  <div>
    <NForm label-placement="left">
      <NFormItem :validation-status="form.errors.value.name ? 'error' : 'success'" :feedback="form.errors.value.name">
        <NInput v-model:value="name" :placeholder="$t('auth.form.name.placeholder')" />
      </NFormItem>
      <NFormItem :validation-status="form.errors.value.email ? 'error' : 'success'" :feedback="form.errors.value.email">
        <NInput v-model:value="email" :placeholder="$t('auth.form.email.placeholder')" />
      </NFormItem>
      <NFormItem>
        <NInput
          v-model:value="password"
          type="password"
          show-password-on="mousedown"
          :placeholder="$t('auth.form.password.placeholder')"
        />
      </NFormItem>
      <NFormItem>
        <NButton round type="primary" class="w-full uppercase" :loading="form.loading.value" @click="form.onSubmit">{{
          $t('auth.action.signIn')
        }}</NButton>
      </NFormItem>
      <NFormItem>
        <div class="flex flex-1 justify-center">
          <NText>{{ $t('auth.text.alreadyHaveAccount') }} </NText>
          <RouterLink :to="{ name: 'sign-in' }" class="ml-1 text-primary font-semibold">{{
            $t('auth.text.createNewAccount')
          }}</RouterLink>
        </div>
      </NFormItem>
    </NForm>
  </div>
</template>

<script setup lang="ts">
import { useSignUpForm } from '../constants/form'

const form = useSignUpForm()

const name = form.useFieldModel('name')
const email = form.useFieldModel('email')
const password = form.useFieldModel('password')
</script>
