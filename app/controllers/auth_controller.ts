import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)

    const { email, password } = payload

    const user = await User.verifyCredentials(email, password)
    if (!user) {
      return response.unauthorized({ success: false, message: 'Invalid credentials' })
    }

    return User.accessTokens.create(user)
  }

  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)

    const { email, fullName, password } = payload

    const user = await User.create({ fullName, email, password })
    if (!user) {
      return response.badRequest({ success: false, message: 'Failed to register' })
    }

    return User.accessTokens.create(user)
  }

  async logout({ response, auth }: HttpContext) {
    try {
      const user = auth.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.ok({ revoked: true, message: 'Logout successfully' })
    } catch (error) {
      return response.badRequest({ error: error })
    }
  }
}
