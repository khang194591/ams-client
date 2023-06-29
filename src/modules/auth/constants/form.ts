import { useForm } from 'vee-validate'
import { signInSchema, signUpSchema } from './schema'
import { useRouter } from 'vue-router'
import { fetchSignIn } from '../services'
import { localStg } from '@/utils'

export const useSignInForm = () => {
  const loading = ref(false)
  const message = useMessage()
  const router = useRouter()
  const form = useForm<RequestDto.SignInDto>({
    validationSchema: signInSchema
  })

  const onSubmit = form.handleSubmit(async (values) => {
    loading.value = true
    const response = await fetchSignIn(values)
    if (response.success) {
      localStg.set('token', response.data.token)
      localStg.set('tokenExpiredAt', response.data.tokenExpiredAt)
      message.success('Sign in success')
      router.push({ name: 'home' })
    } else {
      message.error(response.message!)
    }
    loading.value = false
  })

  return { ...form, loading, onSubmit }
}

export const useSignUpForm = () => {
  const loading = ref(false)
  const message = useMessage()
  const router = useRouter()
  const form = useForm<RequestDto.SignUpDto>({
    validationSchema: signUpSchema
  })

  const onSubmit = form.handleSubmit(async (values) => {
    loading.value = true
    const response = await fetchSignIn(values)
    if (response.success) {
      router.push({ name: 'home' })
    } else {
      message.error(response.message)
    }
    loading.value = false
  })

  return { ...form, loading, onSubmit }
}
