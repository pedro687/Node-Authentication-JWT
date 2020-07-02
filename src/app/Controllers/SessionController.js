const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const authConfig = require('../../config/Auth')

class SessionController {
    async store(req, res) { 
        const { email, password } = req.body

        const user = User.findOne({ where: { email } })
        if(!user) {
            return res.status(401).json({ error: "User doenst Exists" })
        }

        if(!(await user).checkPassword) {
            return res.status(401).json({ error: "Password doenst match" })
        }

        const { id, name, provider } = user

        return res.json({
            email,
            password,
            id,
            name,
            provider,
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

module.exports = new SessionController()