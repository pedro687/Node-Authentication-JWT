const express = require('express')
const routes = require('./router')
require('./database/index')

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.router()
    }

    middlewares() {
        this.server.use(express.json())
    }

    router() {
        this.server.use(routes)
    }
}

module.exports = new App().server