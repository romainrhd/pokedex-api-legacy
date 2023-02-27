import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Appearances delete', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('delete one Appearance', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.delete('/api/appearances/1').guard('api').loginAs(user)

    response.assertStatus(204)
  })

  test('delete one Appearance that does not exist', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.delete('/api/appearances/3').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('delete one Appearance when user is guest', async ({ client }) => {
    const response: ApiResponse = await client.delete('/api/appearances/1')

    response.assertStatus(401)
  })

  test('delete one Appearance when user is not admin', async ({ client }) => {
    const user: User = await User.query().where('isAdmin', false).firstOrFail()
    const response: ApiResponse = await client.delete('/api/appearances/1').guard('api').loginAs(user)

    response.assertStatus(403)
  })

})
