import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ auth, request, response }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)

    const { email, password } = payload

    const user = await User.verifyCredentials(email, password)
    if (!user) {
      return response.unauthorized({ success: false, message: 'Invalid credentials' })
    }

    await auth.use('web').login(user, true)
    return response.ok({ success: true, user })
  }

  async register({ auth, request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)

    const { email, fullName, password } = payload

    const user = await User.create({ fullName, email, password })
    if (!user) {
      return response.badRequest({ success: false, message: 'Failed to register' })
    }

    await auth.use('web').login(user, true)
    return response.ok({ success: true, user })
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok({ success: true })
  }
}
