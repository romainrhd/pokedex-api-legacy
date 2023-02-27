import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Pokemon Types delete', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('delete one Pokemon Types', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.delete('/api/pokemon-types/1').guard('api').loginAs(user)

    response.assertStatus(204)
  })

  test('delete one Pokemon Types that does not exist', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.delete('/api/pokemon-types/25').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('delete one Pokemon Types when user is guest', async ({ client }) => {
    const response: ApiResponse = await client.delete('/api/pokemon-types/1')

    response.assertStatus(401)
  })

  test('delete one Pokemon Types when user is not an admin', async ({ client }) => {
    const user: User = await User.query().where('isAdmin', false).firstOrFail()
    const response: ApiResponse = await client.delete('/api/pokemon-types/1').guard('api').loginAs(user)

    response.assertStatus(403)
  })

})
