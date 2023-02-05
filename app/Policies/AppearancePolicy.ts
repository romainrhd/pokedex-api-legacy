import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class AppearancePolicy extends BasePolicy {
	public async store(user: User) {
    return user.isAdmin ? true : false
	}
	public async update(user: User) {
    return user.isAdmin ? true : false
	}
	public async destroy(user: User) {
    return user.isAdmin ? true : false
	}
}
