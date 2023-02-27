import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ApiResponse } from '@japa/api-client'

test.group('Pokemon Types update', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('update one Pokemon Types', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .put('/api/pokemon-types/1')
      .json({
        name: 'Acier updated'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(200)
  })

  test('update one Pokemon Types that does not exist', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .put('/api/pokemon-types/25')
      .json({
        name: 'New Pokemon Type'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(404)
  })

  test('update one Pokemon Types with name already exists in database', async ({ client }) => {
    const user: User = await User.findOrFail(1)
    const response: ApiResponse = await client
      .put('/api/pokemon-types/1')
      .json({
        name: 'Eau'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(422)
  })

  test('update one Pokemon Types when user is guest', async ({ client }) => {
    const response: ApiResponse = await client
      .put('/api/pokemon-types/1')
      .json({
        name: 'Acier updated'
      })

    response.assertStatus(401)
  })

  test('update one Pokemon Types when user is not an admin', async ({ client }) => {
    const user: User = await User.query().where('isAdmin', false).firstOrFail()
    const response: ApiResponse = await client
      .put('/api/pokemon-types/1')
      .json({
        name: 'Acier updated'
      })
      .guard('api')
      .loginAs(user)

    response.assertStatus(403)
  })

})
