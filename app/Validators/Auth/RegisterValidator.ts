import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    lastName: schema.string([
      rules.required(),
      rules.alpha({
        allow: ['space', 'dash']
      })
    ]),
    firstName: schema.string([
      rules.required(),
      rules.alpha({
        allow: ['space', 'dash']
      })
    ]),
    password: schema.string([
      rules.required(),
      rules.confirmed('passwordConfirmation')
    ]),
    isAdmin: schema.boolean([
      rules.required()
    ])
  })

  public messages: CustomMessages = {}
}
