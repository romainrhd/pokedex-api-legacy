import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Pokemon from 'App/Models/Pokemon'
import User from 'App/Models/User'

export default class Appearance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null

  @column()
  public picture: string

  @column()
  public isDefault: boolean

  @column()
  public isShiny: boolean

  @column()
  public pokemonNationalNumber: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Pokemon, {
    foreignKey: 'evolutionOfNationalNumber',
    localKey: 'nationalNumber'
  })
  public evolutionOf: BelongsTo<typeof Pokemon>

  @manyToMany(() => User, {
    pivotTable: 'pokemon_catched'
  })
  public users: ManyToMany<typeof User>
}
