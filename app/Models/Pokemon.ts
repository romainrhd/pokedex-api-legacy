import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class Pokemon extends BaseModel {
  @column({ isPrimary: true })
  public nationalNumber: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Pokemon)
  public evolutionOf: BelongsTo<typeof Pokemon>

  @hasMany(() => Pokemon, {
    foreignKey: 'nationalNumber'
  })
  public evolutions: HasMany<typeof Pokemon>
}
