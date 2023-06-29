import 'axios'

declare module 'axios' {
  export interface AxiosResponse {
    // Custom properties
    message: string
    success?: boolean
  }
}
