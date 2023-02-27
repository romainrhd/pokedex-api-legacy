import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.resource('pokemons', 'PokemonController').apiOnly()
        Route.resource('pokemon-types', 'PokemonTypesController').apiOnly()
        Route.shallowResource('pokemon.appearances', 'AppearancesController').apiOnly()
        Route.post('/appearance/:id/catched', 'AppearancesController.catched').as('appearance.catched')
        Route.post('logout', 'AuthController.logout').as('auth.logout')
    }).middleware('auth')
    Route.post('register', 'AuthController.register').as('auth.register')
    Route.post('login', 'AuthController.login').as('auth.login')
}).prefix('/api').as('api')
