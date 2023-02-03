import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Appearances store', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('create an Appearance', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('create an Appearance for one Pokemon that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .post('/api/pokemon/25/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(404)
  })

  test('create an Appearance when user is guest', async ({ client }) => {
    const response = await client
      .post('/api/pokemon/1/appearances')
      .json({
        picture: "https://www.pokepedia.fr/images/3/3b/Sprite_002_HOME.png",
        isDefault: true,
        isShiny: false
      })

    response.assertStatus(401)
  })

})
