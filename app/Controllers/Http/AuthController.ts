import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
    public async register({ request }: HttpContextContract) {
      const payload = await request.validate(RegisterValidator)
      return await User.create(payload)
    }

    public async login({ auth, request, response }: HttpContextContract) {
      const payload = await request.validate(LoginValidator)

      try {
          return await auth.use('api').attempt(payload.email, payload.password)
      } catch {
          return response.unauthorized('Invalid credentials')
      }
    }

    public async logout({ auth, response }: HttpContextContract) {
      await auth.use('api').revoke()
      return response.status(204)
    }
}
