import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PokemonType from 'App/Models/PokemonType'
import StorePokemonTypeValidator from 'App/Validators/PokemonType/StorePokemonTypeValidator'
import UpdatePokemonTypeValidator from 'App/Validators/PokemonType/UpdatePokemonTypeValidator'

export default class PokemonTypesController {

  public async index() {
    return await PokemonType.all()
  }

  public async store({ bouncer, request }: HttpContextContract) {
    await bouncer.with('PokemonTypePolicy').authorize('store')
    const payload = await request.validate(StorePokemonTypeValidator)
    return await PokemonType.create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return await PokemonType.findOrFail(params.id)
  }

  public async update({ bouncer, params, request }: HttpContextContract) {
    await bouncer.with('PokemonTypePolicy').authorize('update')
    const pokemonType = await PokemonType.findOrFail(params.id)
    const payload = await request.validate(UpdatePokemonTypeValidator)
    return await pokemonType.merge(payload).save()
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('PokemonTypePolicy').authorize('destroy')
    // TODO : check if type not attach to appearance
    const pokemonType = await PokemonType.findOrFail(params.id)
    pokemonType.delete()
    return response.status(204)
  }

}
