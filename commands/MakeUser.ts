import { BaseCommand } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class MakeUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:user'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Make a new user'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const email = await this.prompt.ask('Veuillez saisir votre email')
    const firstName = await this.prompt.ask('Veuillez saisir votre prénom')
    const lastName = await this.prompt.ask('Veuillez saisir votre nom')
    const password = await this.prompt.secure('Veuillez saisir votre mot de passe')

    await User.create({
      email,
      firstName,
      lastName,
      password
    })

    this.logger.info('Votre utilisateur a bien été créé')
  }
}
