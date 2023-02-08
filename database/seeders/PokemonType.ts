import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PokemonType from 'App/Models/PokemonType'

export default class extends BaseSeeder {

  public static environment = ['development', 'test']

  public async run () {
    await PokemonType.createMany([
      {
        name: 'Acier',
        color: '#60A2B9'
      },
      {
        name: 'Combat',
        color: '#FF8000'
      },
      {
        name: 'Dragon',
        color: '#5060E1'
      },
      {
        name: 'Eau',
        color: '#2980EF'
      },
      {
        name: 'Electrik',
        color: '#FAC000'
      },
      {
        name: 'Fée',
        color: '#EF70EF'
      },
      {
        name: 'Feu',
        color: '#E62829'
      },
      {
        name: 'Glace',
        color: '#3FD8FF'
      },
      {
        name: 'Insecte',
        color: '#91A119'
      },
      {
        name: 'Normal',
        color: '#9FA19F'
      },
      {
        name: 'Plante',
        color: '#3FA129'
      },
      {
        name: 'Poison',
        color: '#9141CB'
      },
      {
        name: 'Psy',
        color: '#EF4179'
      },
      {
        name: 'Roche',
        color: '#AFA981'
      },
      {
        name: 'Sol',
        color: '#915121'
      },
      {
        name: 'Spectre',
        color: '#704170'
      },
      {
        name: 'Ténèbres',
        color: '#50413F'
      },
      {
        name: 'Vol',
        color: '#81B9EF'
      },
    ])
  }

}
