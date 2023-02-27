import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Appearances store', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('create an Appearance', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        pokemonTypes: [11, 12],
        pokemonNationalNumber: 1
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('create an Appearance with no PokemonType', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false,
        pokemonTypes: []
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('create an Appearance with more than two PokemonType', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false,
        pokemonTypes: [11, 12, 13]
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('create an Appearance for one Pokemon that does not exist', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .post('/api/pokemon/25/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false,
        pokemonTypes: [11, 12]
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(404)
  })

  test('create an Appearance when user is guest', async ({ client }) => {
    const response: ApiResponse = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false,
        pokemonTypes: [11, 12]
      })

    response.assertStatus(401)
  })

  test('create an Appearance when user is not an admin', async ({ client }) => {
    const user: User = await User.query().where('isAdmin', false).firstOrFail()
    const response: ApiResponse = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false,
        pokemonTypes: [11, 12]
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(403)
  })

})
