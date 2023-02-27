import { test } from '@japa/runner'
import { ApiResponse } from '@japa/api-client'
import User from 'App/Models/User'

test.group('Auth logout', () => {

  test('logout user', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client.post('/api/logout').guard('api').loginAs(user)

    response.assertStatus(204)
  })

  test('logout user when user is guest', async ({ client }) => {
    const response: ApiResponse = await client.post('/api/logout')

    response.assertStatus(401)
  })

})
