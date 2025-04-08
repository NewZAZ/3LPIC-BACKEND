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
const CourseController = () => import('#controllers/courses_controller')
const GradeController = () => import('#controllers/grades_controller')
const ModuleController = () => import('#controllers/modules_controller')
const UploadController = () => import('#controllers/uploads_controller')
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

    router
      .group(() => {
        router.get('/:id/modules', [ModuleController, 'listByCourse']).as('modules.index')
      })
      .prefix('/courses')

    router
      .group(() => {
        router.get('/:id/grades', [GradeController, 'listByCourse']).as('grades.index')
        router.post('/:id/evaluate', [GradeController, 'evaluate']).as('grades.evaluate')
      })
      .prefix('/courses')
      .middleware(middleware.auth())

    router
      .group(() => {
        router.get('/', [CourseController, 'index']).as('courses.index')
        router.get('/:id', [CourseController, 'show']).as('courses.show')
      })
      .prefix('/courses')

    router
      .post('/upload', [UploadController, 'upload'])
      .as('upload.upload')
      .middleware(middleware.auth())
  })
  .prefix('/api')
