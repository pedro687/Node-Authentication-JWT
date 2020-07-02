const User = require('../Models/User')

class UserController {
    async store(req, res) {
        const { email, password } = req.body
        
        if(!email || !password) {
           return res.status(401).json({ error: "Preencha todos os campos" })
        }

        const verificationEmail = await User.findOne({where : { email }})
        
        if(!verificationEmail) {
            return res.status(401).json({ error: "Email Já existe" })
        }

        

    }
}

module.exports = new UserController()