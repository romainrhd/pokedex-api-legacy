import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Appearances catched', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('add appearance of Pokemon in catched list of connected user', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.post('/api/appearance/1/catched').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('add appearance of Pokemon that does not exist in catched list of connected user', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.post('/api/appearance/3/catched').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('add appearance of Pokemon in catched list of connected user when he is guest', async ({ client }) => {
    const response: ApiResponse = await client.post('/api/appearance/1/catched')

    response.assertStatus(401)
  })

})
