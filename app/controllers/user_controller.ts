import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async me({ auth, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.badRequest({ message: 'User not found' })
    }

    return response.ok(user)
  }
}
