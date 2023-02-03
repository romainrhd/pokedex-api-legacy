import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Appearances show', () => {

  test('get infos of one Appearance', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/appearances/1').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get infos of one Appearance that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/appearances/3').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('get infos of one Appearance when user is guest', async ({ client }) => {
    const response = await client.get('/api/appearances/1')

    response.assertStatus(401)
  })

})
