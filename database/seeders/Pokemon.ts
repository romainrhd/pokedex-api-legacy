import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pokemon from 'App/Models/Pokemon'

export default class extends BaseSeeder {
  public async run () {
    const pokemons = await Pokemon.createMany([
      {
        nationalNumber: 1,
        name: 'Bulbizarre',
      },
      {
        nationalNumber: 2,
        name: 'Herbizarre',
        evolutionOfNationalNumber: 1,
      },
      {
        nationalNumber: 3,
        name: 'Florizarre',
        evolutionOfNationalNumber: 2,
      },
    ])
  }
}
