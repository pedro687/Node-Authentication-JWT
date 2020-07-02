const { Router } = require('express')
const User = require('./app/Models/User')
//const UserController = require('./app/Controllers/UserController')

const routes = new Router()

routes.post('/', async(req, res) => {
    const user = await User.create(req.body)

    return res.json(user)
})

module.exports = routes