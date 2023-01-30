import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAppearanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.nullableAndOptional([
      rules.unique({ table: 'appearances', column: 'name' }),
    ]),
    picture: schema.string([
      rules.required(),
      rules.url()
    ]),
    isDefault: schema.boolean([
      rules.required()
    ]),
    isShiny: schema.boolean([
      rules.required()
    ]),
    pokemonNationalNumber: schema.number([
      rules.required(),
      rules.exists({ table: 'pokemon', column: 'national_number' })
    ]),
  })

  public messages: CustomMessages = {}
}
