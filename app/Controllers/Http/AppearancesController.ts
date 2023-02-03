import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appearance from 'App/Models/Appearance'
import Pokemon from 'App/Models/Pokemon'
import CreateAppearanceValidator from 'App/Validators/CreateAppearanceValidator'
import UpdateAppearanceValidator from 'App/Validators/UpdateAppearanceValidator'

export default class AppearancesController {
  public async index({ params }: HttpContextContract) {
    const pokemon = await Pokemon
      .query()
      .where('nationalNumber', params.pokemon_id)
      .preload('appearances')
      .firstOrFail()
    return pokemon.appearances
  }

  public async store({ params, request }: HttpContextContract) {
    const pokemon = await Pokemon.findOrFail(params.pokemon_id)
    const payload = await request.validate(CreateAppearanceValidator)
    return await pokemon.related('appearances').create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return await Appearance.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const appearance = await Appearance.findOrFail(params.id)
    const payload = await request.validate(UpdateAppearanceValidator)
    return await appearance.merge(payload).save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const appearance = await Appearance.findOrFail(params.id)
    await appearance.delete()
    return response.status(204)
  }
}
