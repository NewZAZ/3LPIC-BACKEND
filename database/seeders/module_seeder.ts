import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Course from '#models/course'
import Module from '#models/module'

export default class extends BaseSeeder {
  async run() {
    const courses = await Course.all()

    for (const course of courses) {
      await Module.createMany([
        {
          courseId: course.id,
          title: `${course.title} - Module 1`,
          description: 'Introduction au cours.',
        },
        {
          courseId: course.id,
          title: `${course.title} - Module 2`,
          description: 'Approfondissement.',
        },
      ])
    }
  }
}
