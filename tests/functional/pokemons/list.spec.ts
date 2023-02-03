import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemons list', () => {
  
  test('get a list of Pokemon', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/pokemons').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get a list of Pokemon when user is guest', async ({ client }) => {
    const response = await client.get('/api/pokemons')

    response.assertStatus(401)
  })

})
