import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePokemonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nationalNumber: schema.number([
      rules.required(),
      rules.unique({ table: 'pokemon', column: 'national_number' }),
    ]),
    name: schema.string([
      rules.required(),
      rules.unique({ table: 'pokemon', column: 'name' }),
    ]),
    evolutionOfNationalNumber: schema.number.optional([
      rules.exists({ table: 'pokemon', column: 'national_number' })
    ])
  })

  public messages: CustomMessages = {}
}
