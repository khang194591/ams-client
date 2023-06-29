import axios from 'axios'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { userSchema } from '../constants/schema'
import { useUserStore } from '../store'
import { UserDto } from '../types'

export const useUserForm = () => {
  const { t } = useI18n()
  const message = useMessage()

  const store = useUserStore()

  const form = useForm<UserDto>({ validationSchema: userSchema })

  const onSubmit = form.handleSubmit(async (values) => {
    store.userForm.loading = true

    if (store.userForm.mode === 'create') {
      const response = await axios.post('/user', values)
      if (response.success) {
        message.success(t('user.response.createSuccess'))
      } else {
        message.error(t(response.message))
      }
    } else {
      const response = await axios.patch(`/user/${store.userForm.id}`, values)
      if (response.success) {
        message.success(t('user.response.updateSuccess'))
      } else {
        message.error(t(response.message))
      }
    }

    store.userForm.loading = false
  })

  function setForm(val?: Partial<UserDto>) {
    form.resetForm({ values: { ...val } || undefined })
  }

  return { ...form, onSubmit, setForm }
}
