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

    const fileExtension = file.clientName.split('.').pop()
    if (!['py', 'c'].includes(fileExtension)) {
      return response.badRequest({ message: 'Invalid file type' })
    }

    const moduleId = request.input('moduleId')
    if (!moduleId) {
      return response.badRequest({ message: 'Module ID not provided' })
    }

    const newFileName = `${user.id}-${moduleId}-${file.clientName}`
    await file.move('/mnt/shared', {
      name: newFileName,
      overwrite: true,
    })
    if (!file.isValid) {
      return response.badRequest({ message: 'File upload failed' })
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
