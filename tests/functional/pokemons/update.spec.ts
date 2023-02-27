import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Pokemons update', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('update one Pokemon', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Bulbi'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('update one Pokemon that does not exist', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .put('/api/pokemons/25')
      .json({
        name: 'Pika'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(404)
  })

  test('update one Pokemon with name already exists in database', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Florizarre'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('update one Pokemon when user is guest', async ({ client }) => {
    const response: ApiResponse = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Bulbi'
      })

    response.assertStatus(401)
  })

  test('update one Pokemon when user is not an admin', async ({ client }) => {
    const user: User = await User.query().where('isAdmin', false).firstOrFail()
    const response: ApiResponse = await client
      .put('/api/pokemons/1')
      .json({
        name: 'Bulbi'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(403)
  })

})
