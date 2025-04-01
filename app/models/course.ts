import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Module from '#models/module'
import Grade from '#models/grade'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @hasMany(() => Module)
  declare modules: HasMany<typeof Module>

  @hasMany(() => Grade)
  declare grades: HasMany<typeof Grade>
}
