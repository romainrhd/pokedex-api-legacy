import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appearance from 'App/Models/Appearance'
import CreateAppearanceValidator from 'App/Validators/CreateAppearanceValidator'
import UpdateAppearanceValidator from 'App/Validators/UpdateAppearanceValidator'

export default class AppearancesController {
  public async index() {
    return await Appearance.query().orderBy('created_at', 'asc')
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateAppearanceValidator)
    return await Appearance.create(payload)
  }

  public async show({ params }: HttpContextContract) {
    return await Appearance.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const appearance = await Appearance.findOrFail(params.id)
    const payload = await request.validate(UpdateAppearanceValidator)
    return await appearance.merge(payload).save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const appearance = await Appearance.findOrFail(params.id)
    await appearance.delete()
    return response.status(204)
  }
}
