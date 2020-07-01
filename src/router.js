const { Router } = require('express')
const User = require('./app/Models/User')

const routes = new Router()

routes.post('/', async(req, res) => {
    const users = await User.create(req.body)

    return res.json(users)
})

module.exports = routes