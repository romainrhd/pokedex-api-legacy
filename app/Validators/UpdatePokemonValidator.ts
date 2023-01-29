import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePokemonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nationalNumber: schema.number.optional([
      rules.unique({ table: 'pokemon', column: 'national_number' }),
    ]),
    name: schema.string.optional([
      rules.unique({ table: 'pokemon', column: 'name' }),
    ]),
    evolutionOfNationalNumber: schema.number.nullableAndOptional([
      rules.exists({ table: 'pokemon', column: 'national_number' })
    ])
  })

  public messages: CustomMessages = {}
}
