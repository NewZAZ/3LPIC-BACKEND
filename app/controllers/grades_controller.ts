import type { HttpContext } from '@adonisjs/core/http'
import Grade from '#models/grade'

export default class GradesController {
  async listByCourse({ params, response, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'Unauthorized' })
    }

    const courseId = params.id
    const userId = auth.user.id

    const grades = await Grade.query().where('course_id', courseId).where('user_id', userId)

    if (!grades) {
      return response.notFound({ message: 'Grades not found' })
    }

    return response.ok(grades)
  }
}
