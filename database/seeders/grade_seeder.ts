import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Grade from '#models/grade'
import Course from '#models/course'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const users = await User.all()
    const courses = await Course.all()

    for (const user of users) {
      for (const course of courses) {
        await Grade.createMany([
          {
            courseId: course.id,
            userId: user.id,
            title: 'Contrôle continu',
            grade: 15,
            maxGrade: 20,
            percentage: 40,
            feedback: 'Bon travail',
          },
          {
            courseId: course.id,
            userId: user.id,
            title: 'Examen final',
            grade: 17,
            maxGrade: 20,
            percentage: 60,
            feedback: 'Très bon résultat',
          },
        ])
      }
    }
  }
}
