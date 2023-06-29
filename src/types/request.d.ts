declare namespace RequestDto {
  interface SignInDto {
    email: string
    password: string
  }

  interface SignUpDto extends SignInDto {
    name: string
  }
}
