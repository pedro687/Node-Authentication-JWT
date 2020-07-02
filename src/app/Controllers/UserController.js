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

        User.create({
            email,
            password,
            name,
            provider
        })   

        return res.status(200).json({ success: "Usuário criado com sucesso!" })
    }

    async updateUser(req, res) {
        res.json({ message: "Boa noite" })
    }
}

module.exports = new UserController()