import type { HttpContext } from '@adonisjs/core/http'
import Course from '#models/course'

export default class CoursesController {
  public async index({ response }: HttpContext) {
    return response.ok(await Course.all())
  }

  public async show({ params, response }: HttpContext) {
    const course = await Course.findOrFail(params.id)
    if (!course) {
      return response.notFound({ success: false, message: 'Course not found' })
    }
    return response.ok(course)
  }
}
