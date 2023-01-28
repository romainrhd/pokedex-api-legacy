// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PokemonController {
  public async index() {
    return [
      {
        nationalNumber: 1,
        name: 'Bulbizarre'
      },
      {
        nationalNumber: 2,
        name: 'Herbizarre'
      },
      {
        nationalNumber: 3,
        name: 'Florizarre'
      }
    ]
  }
}
