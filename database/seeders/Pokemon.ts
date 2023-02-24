import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Appearance from 'App/Models/Appearance';
import Pokemon from 'App/Models/Pokemon'
import PokemonType from 'App/Models/PokemonType';
import { pokemons } from '../data/pokemons'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']

  public async run () {
    for(const pokemon of pokemons) {
      await Pokemon.create({
        nationalNumber: pokemon.nationalNumber,
        name: pokemon.name,
        evolutionOfNationalNumber: pokemon.evolutionOfNationalNumber
      })

      if(pokemon.appearances.length > 0) {
        for(const appearance of pokemon.appearances) {
          const newAppearance = await Appearance.create({
            name: appearance.name,
            picture: appearance.picture,
            isDefault: appearance.isDefault,
            pokemonNationalNumber: pokemon.nationalNumber
          })

          if(appearance.shiny) {
            const shiny = await Appearance.create({
              name: appearance.shiny.name,
              picture: appearance.shiny.picture,
              isDefault: appearance.shiny.isDefault,
              pokemonNationalNumber: pokemon.nationalNumber
            })
            await newAppearance.related('shiny').associate(shiny)
          }

          if(appearance.types.length > 1) {
            for(const type of appearance.types) {
              const pokemonType = await PokemonType.findByOrFail('name', type)
              await newAppearance.related('pokemonTypes').attach([pokemonType.id])
            }
          }
        }
      }

    }
  }
}
