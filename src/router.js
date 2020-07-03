const { Router } = require('express')
const UserController = require('./app/Controllers/UserController')
const SessionController = require('./app/Controllers/SessionController')
const Auth = require('./app/Middlewares/Auth')

const routes = new Router()

routes.post('/', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(Auth)
routes.put('/users', UserController.updateUser)

module.exports = routes