import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Appearance of one Pokemon list', () => {

  test('get a list of Appearances for one Pokemon', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.get('/api/pokemon/1/appearances').guard('api').loginAs(user)

    response.assertStatus(200)
  })

  test('get a list of Appearances for one Pokemon that does not exist', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.get('/api/pokemon/25/appearances').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('get a list of Appearances for one Pokemon when user is guest', async ({ client }) => {
    const response: ApiResponse = await client.get('/api/pokemon/1/appearances')

    response.assertStatus(401)
  })

})
