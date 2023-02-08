import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Appearances update', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('update one Appearance', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client
      .put('/api/appearances/1')
      .json({
        name: 'Bulbizarre classique',
        pokemonTypes: [11, 12]
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('update one Appearance that does not exist', async ({ client }) => {
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

  test('update one Appearance for one Pokemon that does not exist', async ({ client }) => {
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

  test('update one Appearance when user is guest', async ({ client }) => {
    const response = await client
      .put('/api/appearances/1')
      .json({
        name: 'Bulbizarre classique'
      })

    response.assertStatus(401)
  })

  test('update one Appearance when user is not an admin', async ({ client }) => {
    const user = await User.query().where('isAdmin', false).firstOrFail()
    const response = await client
      .put('/api/appearances/1')
      .json({
        name: 'Bulbizarre classique'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(403)
  })

})
