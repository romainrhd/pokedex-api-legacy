import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Pokemon Types store', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('create a Pokemon Type', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .post('/api/pokemon-types')
      .json({
        name: 'New Pokemon Type',
        color: '#FFFFFF'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('create a Pokemon Type when he already exists', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .post('/api/pokemon-types')
      .json({
        name: 'Acier',
        color: '#60A2B9'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('create a Pokemon Type when user is guest', async ({ client }) => {
    const response: ApiResponse = await client
      .post('/api/pokemon-types')
      .json({
        name: 'New Pokemon Type',
        color: '#FFFFFF'
      })

    response.assertStatus(401)
  })

  test('create a Pokemon Type when user is not an admin', async ({ client }) => {
    const user: User = await User.query().where('isAdmin', false).firstOrFail()
    const response: ApiResponse = await client
      .post('/api/pokemon-types')
      .json({
        name: 'New Pokemon Type',
        color: '#FFFFFF'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(403)
  })

})
