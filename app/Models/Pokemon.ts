import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Appearance from 'App/Models/Appearance'

export default class Pokemon extends BaseModel {
  @column({ isPrimary: true })
  public nationalNumber: number

  @column()
  public name: string

  @column()
  public evolutionOfNationalNumber: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Pokemon, {
    foreignKey: 'evolutionOfNationalNumber',
    localKey: 'nationalNumber'
  })
  public evolutionOf: BelongsTo<typeof Pokemon>

  @hasMany(() => Pokemon, {
    foreignKey: 'evolutionOfNationalNumber',
    localKey: 'nationalNumber'
  })
  public evolutions: HasMany<typeof Pokemon>

  @hasMany(() => Appearance)
  public appearances: HasMany<typeof Appearance>
}
