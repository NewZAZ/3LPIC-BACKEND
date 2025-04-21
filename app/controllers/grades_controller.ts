import type { HttpContext } from '@adonisjs/core/http'
import Grade from '#models/grade'
import Module from '#models/module'
import Course from '#models/course'

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
    const { userId, moduleId, score } = request.body()

    console.log('courseid', course.id, 'moduleId', moduleId, 'userId', userId, 'score', score)
    const course = await Course.query().where('id', params.id).firstOrFail()

    if (!course) {
      return response.notFound({ success: false, message: 'Course not found' })
    }


    await Grade.create({
      userId,
      courseId: course.id,
      moduleId,
      grade: score,
      maxGrade: 100,
      percentage: 100,
    })

    return response.ok({ success: true })
  }
}
