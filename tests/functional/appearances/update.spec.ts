import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Appearances update', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('update one Appearances', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/appearances/1')
      .json({
        name: 'Bulbizarre classique'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('update one Appearances that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/appearances/3')
      .json({
        name: 'Herbizarre classique'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(404)
  })

  test('update one Appearances for one Pokemon that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/appearances/1')
      .json({
        pokemonNationalNumber: 25
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('update one Appearances when user is guest', async ({ client }) => {
    const response = await client
      .put('/api/appearances/1')
      .json({
        name: 'Bulbizarre classique'
      })

    response.assertStatus(401)
  })

})
