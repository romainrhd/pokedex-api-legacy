import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAppearanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.nullableAndOptional(),
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
    pokemonTypes: schema.array([
      rules.required(),
      rules.minLength(1),
      rules.maxLength(2)
    ]).members(schema.number([
      rules.exists({ table: 'pokemon_types', column: 'id' })
    ]))
  })

  public messages: CustomMessages = {}
}
