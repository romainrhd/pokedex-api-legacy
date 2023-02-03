import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Appearances delete', (group) => {
  
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('delete one Appearance', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.delete('/api/appearances/1').guard('api').loginAs(user)

    response.assertStatus(204)
  })

  test('delete one Appearance that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.delete('/api/appearances/3').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('delete one Appearance when user is guest', async ({ client }) => {
    const response = await client.delete('/api/appearances/1')

    response.assertStatus(401)
  })

})
