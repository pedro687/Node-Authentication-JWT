const User = require('../Models/User')

class UserController {
    async store(req, res) {
        const { email, password, name, provider } = req.body

        if(!email || !password) {
           return res.status(401).json({ error: "Preencha todos os campos" })
        }

        const verificationEmail = await User.findOne({where : { email }})
        
        if(verificationEmail) {
            return res.status(401).json({ error: "Email Já existe" })
        }

        const verificationPassword = new User()
        
        if(!verificationPassword.checkPassword(password)) {
            return res.status(401).json({ error: "Password dont match" })
        }

        User.create({
            email,
            password,
            name,
            provider
        })   

        return res.status(200).json({ success: "Usuário criado com sucesso!" })

    }
}

module.exports = new UserController()