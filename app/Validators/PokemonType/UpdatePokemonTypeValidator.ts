import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePokemonTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([
      rules.unique({ table: 'pokemon_types', column: 'name' })
    ]),
    color: schema.string.optional([
      // TODO : validation rules for hexadecimal code color
    ])
  })

  public messages: CustomMessages = {}
}
