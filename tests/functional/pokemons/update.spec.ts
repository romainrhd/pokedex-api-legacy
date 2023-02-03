import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemons update', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('update one Pokemon', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Bulbi'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('update one Pokemon that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/pokemons/25')
      .json({
        name: 'Pika'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(404)
  })

  test('update one Pokemon with name already exists in database', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Florizarre'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('update one Pokemon when user is guest', async ({ client }) => {
    const response = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Bulbi'
      })

    response.assertStatus(401)
  })

})
