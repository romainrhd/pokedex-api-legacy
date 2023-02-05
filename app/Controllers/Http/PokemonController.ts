import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pokemon from 'App/Models/Pokemon'
import CreatePokemonValidator from 'App/Validators/Pokemon/CreatePokemonValidator'
import UpdatePokemonValidator from 'App/Validators/Pokemon/UpdatePokemonValidator'

export default class PokemonController {

  public async index() {
    return await Pokemon.query().orderBy('created_at', 'asc')
  }

  public async store({ bouncer, request }: HttpContextContract) {
    await bouncer.with('PokemonPolicy').authorize('store')
    const payload = await request.validate(CreatePokemonValidator)
    return await Pokemon.create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return await Pokemon.findOrFail(params.id)
  }

  public async update({ bouncer, params, request }: HttpContextContract) {
    await bouncer.with('PokemonPolicy').authorize('update')
    const pokemon = await Pokemon.findOrFail(params.id)
    const payload = await request.validate(UpdatePokemonValidator)
    return await pokemon.merge(payload).save()
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('PokemonPolicy').authorize('destroy')
    const pokemon = await Pokemon
      .query()
      .where('nationalNumber', params.id)
      .preload('appearances')
      .preload('evolutions')
      .firstOrFail()
    if(pokemon.appearances.length > 0){
      return response.status(422).send({
        message: "This Pokemon has at least one appearance. Please remove this Pokemon's appearance before deleting it."
      })
    }
    if(pokemon.evolutions.length > 0){
      return response.status(422).send({
        message: "This Pokemon has at least one evolution. Please remove this Pokemon's evolution before deleting it."
      })
    }
    await pokemon.delete()
    return response.status(204)
  }

}
