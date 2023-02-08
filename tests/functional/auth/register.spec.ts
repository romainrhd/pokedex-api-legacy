import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Auth register', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('register user', async ({ client }) => {
    const response = await client
      .post('/api/register')
      .json({
        lastName: "Test",
        firstName: "Test",
        email: "test@test.fr",
        password: "secret",
        passwordConfirmation: "secret",
      })

    response.assertStatus(200)
  })

  test('register user with email already used', async ({ client }) => {
    const response = await client
      .post('/api/register')
      .json({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@test.fr",
        password: "secret",
        passwordConfirmation: "secret",
      })

    response.assertStatus(422)
  })

})
