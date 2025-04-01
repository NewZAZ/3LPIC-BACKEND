/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/login', [AuthController, 'login']).as('auth.login')
        router.post('/register', [AuthController, 'register']).as('auth.register')
        router.post('/logout', [AuthController, 'logout']).as('auth.logout')
      })
      .prefix('/auth')

    router
      .group(() => {
        router.get('/me', [UserController, 'me']).as('user.me')
      })
      .prefix('/user')
      .middleware(middleware.auth())
  })
  .prefix('/api')
