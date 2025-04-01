import type { HttpContext } from '@adonisjs/core/http'
import Module from '#models/module'

export default class ModulesController {
  async listByCourse({ params, response }: HttpContext) {
    const modules = await Module.query().where('course_id', params.id)

    return response.ok({ success: true, data: modules })
  }
}
