import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemons show', () => {

  test('get infos of one Pokemon', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/pokemons/1').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get infos of one Pokemon that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.get('/api/pokemons/25').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('get infos of one Pokemon when user is guest', async ({ client }) => {
    const response = await client.get('/api/pokemons/1')

    response.assertStatus(401)
  })

})
