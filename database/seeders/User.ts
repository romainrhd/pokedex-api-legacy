import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static environment = ['test']

  public async run () {
    await User.create({
      firstName: "Test",
      lastName: "Test",
      email: "test@test.fr",
      password: "secret",
    })
  }
}