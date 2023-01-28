import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pokemon from 'App/Models/Pokemon'

export default class PokemonController {
  public async index({}: HttpContextContract) {
    return await Pokemon.all()
  }

  public async store({}: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {
    return await Pokemon.findOrFail(params.id)
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
