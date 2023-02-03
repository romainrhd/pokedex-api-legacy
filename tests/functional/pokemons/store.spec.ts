import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemons store', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('create a Pokemon', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .post('/api/pokemons')
      .json({
        nationalNumber: 25,
        name: 'Pikachu'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('create a Pokemon when he already exists', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .post('/api/pokemons')
      .json({
        nationalNumber: 1,
        name: 'Bulbizarre'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('create a Pokemon when user is guest', async ({ client }) => {
    const response = await client
      .post('/api/pokemons')
      .json({
        nationalNumber: 25,
        name: 'Pikachu'
      })

    response.assertStatus(401)
  })

})
