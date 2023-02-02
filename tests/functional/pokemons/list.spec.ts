import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemons list', () => {
  test('get a list of Pokemon', async ({ client }) => {
    // TODO : check how to run migrations and seeds on other database
    const user = await User.find(1)
    const response = await client.get('/api/pokemons').guard('api').loginAs(user)

    response.assertStatus(200)
  })
})
