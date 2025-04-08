import type { HttpContext } from '@adonisjs/core/http'
import Grade from '#models/grade'
import Module from "#models/module";

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

  async evaluate({ params, request, response }: HttpContext) {
    const { userId, score } = request.body()

    const module = await Module.query().where('id', params.id).firstOrFail()

    if (!module) {
      return response.notFound({ success: false, message: 'Module not found' })
    }

    await Grade.create({
      userId,
      courseId: module.id,
      grade: score,
      maxGrade: 100,
    })

    return response.ok({ success: true })
  }
}
