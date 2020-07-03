const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const AuthConfig = require('../../config/Auth')

class SessionController {
    async store(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })
        if(!user) {
            return res.status(401).json({ error: "Users doenst exists" })
        }

        if(!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Password doenst match" })
        }

        const { name, id, provider } = user
        
       return res.json({
            id,
            name,
            email,
            provider,
            token: jwt.sign({id}, AuthConfig.secret, {
                expiresIn: AuthConfig.expiresIn
            })
        })

    }
}

module.exports = new SessionController()