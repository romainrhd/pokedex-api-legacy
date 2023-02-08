import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class extends BaseSeeder {

  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    if(!Seeder.default.environment.includes(Application.nodeEnvironment)){
      return
    }
    await new Seeder.default(this.client).run()
  }

  public async run () {
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../PokemonType'))
    await this.runSeeder(await import('../Pokemon'))
  }

}
