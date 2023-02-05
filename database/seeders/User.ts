import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['test']

  public async run () {
    await User.createMany([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@test.fr",
        password: "secret",
        isAdmin: true
      },
      {
        firstName: "Bryan",
        lastName: "Doe",
        email: "bryan.doe@test.fr",
        password: "secret",
        isAdmin: false
      },
    ])
  }
}
