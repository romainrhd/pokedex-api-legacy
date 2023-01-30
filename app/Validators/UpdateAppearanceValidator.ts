import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAppearanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.nullableAndOptional([
      rules.unique({ table: 'appearances', column: 'name' }),
    ]),
    picture: schema.string.optional([
      rules.url()
    ]),
    isDefault: schema.boolean.optional(),
    isShiny: schema.boolean.optional(),
    pokemonNationalNumber: schema.number.optional([
      rules.exists({ table: 'pokemon', column: 'national_number' })
    ]),
  })

  public messages: CustomMessages = {}
}
