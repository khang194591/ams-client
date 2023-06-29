import { ObjectSchema, object, string } from 'yup'

export const signInSchema = object<RequestDto.SignInDto>({
  email: string().email().required(),
  password: string().required()
})

export const signUpSchema: ObjectSchema<{}, RequestDto.SignUpDto> = signInSchema.concat(
  object({
    name: string().required()
  })
)
