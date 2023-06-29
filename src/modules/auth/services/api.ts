import axios from 'axios'

export async function fetchSignIn(dto: RequestDto.SignInDto) {
  return await axios.post<ResponseDto.SignInDto>('/auth/sign-in', dto)
}
