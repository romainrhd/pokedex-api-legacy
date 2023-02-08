import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StorePokemonTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.required(),
      rules.unique({ table: 'pokemon_types', column: 'name' })
    ]),
    color: schema.string([
      rules.required(),
      // TODO : validation rules for hexadecimal code color
    ])
  })

  public messages: CustomMessages = {}
}
