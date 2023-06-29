import { localStg } from '@/utils'
import dayjs from 'dayjs'
import { Router } from 'vue-router'

export const setupAuthMiddleware = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const token = localStg.get('token')
    const tokenExpiredAt = localStg.get('tokenExpiredAt')
    const tokenValid = token && tokenExpiredAt && dayjs(tokenExpiredAt).isAfter(Date.now())
    // Authenticated user cannot access auth layout
    if (to.meta.layout === 'auth' && tokenValid) {
      return next({ path: from.path })
      // Force user to sign-in if their token are invalid
    } else if (to.meta.layout === 'base' && !tokenValid) {
      return next({ name: 'sign-in' })
      // Else continue
    } else {
      return next()
    }
  })
}
