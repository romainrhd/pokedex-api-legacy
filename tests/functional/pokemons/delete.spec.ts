import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Pokemons delete', (group) => {
  
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('delete one Pokemon', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.delete('/api/pokemons/3').guard('api').loginAs(user)

    response.assertStatus(204)
  })

  test('delete one Pokemon with appearances', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.delete('/api/pokemons/1').guard('api').loginAs(user)

    response.assertStatus(422)
  })

  test('delete one Pokemon with evolutions', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.delete('/api/pokemons/1').guard('api').loginAs(user)

    response.assertStatus(422)
  })

  test('delete one Pokemon that does not exist', async ({ client }) => {
    const user = await User.findOrFail(1)
    const response = await client.delete('/api/pokemons/25').guard('api').loginAs(user)

    response.assertStatus(404)
  })

  test('delete one Pokemon when user is guest', async ({ client }) => {
    const response = await client.delete('/api/pokemons/1')

    response.assertStatus(401)
  })

})