import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async me({ auth, request, response }: HttpContext) {
    const user = auth.user

    console.log(request.headers())
    if (!user) {
      return response.badRequest({ message: 'User not found' })
    }

    return response.ok(user)
  }
}
