import { test } from '@japa/runner'

test.group('Auth login', () => {

  test('login user', async ({ client }) => {
    const response = await client
      .post('/api/login')
      .json({
        email: "john.doe@test.fr",
        password: "secret",
      })

    response.assertStatus(200)
  })

  test('login user with wrong email', async ({ client }) => {
    const response = await client
      .post('/api/login')
      .json({
        email: "wrong.password@test.com",
        password: "secret",
      })

    response.assertStatus(401)
  })

  test('login user with wrong password', async ({ client }) => {
    const response = await client
      .post('/api/login')
      .json({
        email: "john.doe@test.fr",
        password: "wongPassword",
      })

    response.assertStatus(401)
  })

})
