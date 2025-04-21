import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Course from '#models/course'
import Module from '#models/module'

export default class extends BaseSeeder {
  async run() {
    const courses = await Course.all()

    let i = 0
    for (const course of courses) {
      i += 1
      await Module.createMany([
        {
          id: i,
          courseId: course.id,
          title: `${course.title} - Module 1`,
          description: 'Introduction au cours.',
        },
        {
          id: i + 1,
          courseId: course.id,
          title: `${course.title} - Module 2`,
          description: 'Approfondissement.',
        },
      ])
      i += 1
    }
  }
}
