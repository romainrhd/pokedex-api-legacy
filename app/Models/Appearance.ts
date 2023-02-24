import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Pokemon from 'App/Models/Pokemon'
import User from 'App/Models/User'
import PokemonType from './PokemonType'

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
  public shinyId: number

  @column()
  public pokemonNationalNumber: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Appearance, {
    foreignKey: 'shinyId',
  })
  public shiny: BelongsTo<typeof Appearance>

  @belongsTo(() => Pokemon, {
    foreignKey: 'pokemonNationalNumber'
  })
  public pokemon: BelongsTo<typeof Pokemon>

  @manyToMany(() => User, {
    pivotTable: 'pokemon_catched',
    pivotTimestamps: true
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => PokemonType, {
    pivotTimestamps: true
  })
  public pokemonTypes: ManyToMany<typeof PokemonType>
}
