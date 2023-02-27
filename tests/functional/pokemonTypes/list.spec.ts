import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Pokemon types list', () => {

  test('get a list of Pokemon Types', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.get('/api/pokemon-types').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get a list of Pokemon Types when user is guest', async ({ client }) => {
    const response: ApiResponse = await client.get('/api/pokemon-types')

    response.assertStatus(401)
  })

})
