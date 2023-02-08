import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemon types list show', () => {

  test('get infos of one Pokemon Type', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/pokemon-types/1').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get infos of one Pokemon Type that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/pokemon-types/25').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('get infos of one Pokemon Type when user is guest', async ({ client }) => {
    const response = await client.get('/api/pokemon-types/1')

    response.assertStatus(401)
  })

})