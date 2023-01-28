import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pokemon from 'App/Models/Pokemon'

export default class extends BaseSeeder {
  public async run () {
    await Pokemon.createMany([
      {
        nationalNumber: 1,
        name: 'Bulbizarre',
      },
      {
        nationalNumber: 2,
        name: 'Herbizarre',
      },
      {
        nationalNumber: 3,
        name: 'Florizarre',
      },
    ])
  }
}
