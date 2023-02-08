import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appearance from 'App/Models/Appearance'
import Pokemon from 'App/Models/Pokemon'
import CreateAppearanceValidator from 'App/Validators/Appearance/CreateAppearanceValidator'
import UpdateAppearanceValidator from 'App/Validators/Appearance/UpdateAppearanceValidator'

export default class AppearancesController {

  public async index({ params }: HttpContextContract) {
    const pokemon = await Pokemon
      .query()
      .where('nationalNumber', params.pokemon_id)
      .preload('appearances')
      .firstOrFail()
    return pokemon.appearances
  }

  public async store({ bouncer, params, request }: HttpContextContract) {
    await bouncer.with('AppearancePolicy').authorize('store')
    const pokemon = await Pokemon.findOrFail(params.pokemon_id)
    const payload = await request.validate(CreateAppearanceValidator)
    const appearance = await pokemon.related('appearances').create(payload)
    await appearance.related('pokemonTypes').attach(payload.pokemonTypes)
    await appearance.load('pokemonTypes')
    return appearance
  }

  public async show({ params }: HttpContextContract) {
    return await Appearance.findOrFail(params.id)
  }

  public async update({ bouncer, params, request }: HttpContextContract) {
    await bouncer.with('AppearancePolicy').authorize('update')
    const appearance = await Appearance.findOrFail(params.id)
    const payload = await request.validate(UpdateAppearanceValidator)
    await appearance.merge(payload).save()
    if(payload.pokemonTypes) {
      await appearance.related('pokemonTypes').sync(payload.pokemonTypes)
    }
    await appearance.load('pokemonTypes')
    return appearance
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('AppearancePolicy').authorize('destroy')
    const appearance = await Appearance.findOrFail(params.id)
    await appearance.delete()
    return response.status(204)
  }

  public async catched({ params, auth }: HttpContextContract) {
    const appearance = await Appearance.findOrFail(params.id)
    await appearance.related('users').attach([auth.user!.id])
    await auth.user!.load('catched')
    return auth.user!.catched
  }

}
