const { Router } = require('express')
const UserController = require('./app/Controllers/UserController')
const SessionController = require('./app/Controllers/SessionController')

const routes = new Router()

routes.post('/', UserController.store)
routes.put('/sessions', SessionController.store)

module.exports = routes