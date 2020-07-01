const { Router } = require('express')
const User = require('./app/Models/User')

const routes = new Router()

routes.post('/', (req, res) => {
    return res.json({message: "Hello World"})
})

module.exports = routes