declare namespace StorageInterface {
  interface Session {
    demoKey: string
  }

  interface Local {
    token: string
    tokenExpiredAt: string
    refreshToken: string
    refreshTokenExpiredAt: string
    language: Language
  }
}
