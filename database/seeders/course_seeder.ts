import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Course from '#models/course'

export default class extends BaseSeeder {
  async run() {
    await Course.createMany([
      {
        title: 'Mathématiques Avancées',
        description: 'Cours sur les fonctions, les dérivées et les intégrales.',
      },
      {
        title: 'Introduction à la Programmation',
        description: 'Apprendre les bases du développement logiciel.',
      },
    ])
  }
}
