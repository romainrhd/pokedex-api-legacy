import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Pokemon from 'App/Models/Pokemon'

export default class PokemonPolicy extends BasePolicy {
	public async viewList(user: User) {}
	public async view(user: User, pokemon: Pokemon) {}
	public async create(user: User) {}
	public async update(user: User, pokemon: Pokemon) {}
	public async delete(user: User, pokemon: Pokemon) {}
}
