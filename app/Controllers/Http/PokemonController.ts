import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pokemon from 'App/Models/Pokemon'
import CreatePokemonValidator from 'App/Validators/CreatePokemonValidator'
import UpdatePokemonValidator from 'App/Validators/UpdatePokemonValidator'

export default class PokemonController {
  public async index({}: HttpContextContract) {
    return await Pokemon.query().orderBy('created_at', 'asc')
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreatePokemonValidator)
    return await Pokemon.create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return await Pokemon.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const pokemon = await Pokemon.findOrFail(params.id)
    const payload = await request.validate(UpdatePokemonValidator)
    return await pokemon.merge(payload).save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const pokemon = await Pokemon.findOrFail(params.id)
    await pokemon.delete()
    return response.status(204)
  }
}
