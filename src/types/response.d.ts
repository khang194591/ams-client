declare namespace ResponseDto {
  interface SignInDto {
    token: string
    tokenExpiredAt: string
    refreshToken: string
  }
}
