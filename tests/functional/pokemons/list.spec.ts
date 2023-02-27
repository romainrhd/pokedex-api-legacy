import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Pokemons list', () => {

  test('get a list of Pokemon', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.get('/api/pokemons').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get a list of Pokemon when user is guest', async ({ client }) => {
    const response: ApiResponse = await client.get('/api/pokemons')

    response.assertStatus(401)
  })

})
