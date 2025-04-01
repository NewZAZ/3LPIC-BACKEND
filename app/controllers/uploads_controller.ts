// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Upload from '#models/upload'

export default class UploadsController {
  async upload({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'Unauthorized' })
    }
    const file = request.file('file')

    if (!file) {
      return response.badRequest({ message: 'File not found' })
    }

    await file.move('./uploads')

    if (!file.isValid) {
      return response.badRequest({ message: 'File upload failed' })
    }

    const moduleId = request.input('moduleId')
    if (!moduleId) {
      return response.badRequest({ message: 'Module ID not provided' })
    }

    const upload = await Upload.create({
      userId: user.id,
      moduleId,
      originalName: file.fileName,
      filePath: file.filePath,
    })

    return response.ok({ message: 'File uploaded successfully', upload })
  }
}
