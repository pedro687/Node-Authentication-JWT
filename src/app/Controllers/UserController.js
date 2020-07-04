const User = require('../Models/User')
const Yup = require('yup')


class UserController {
    async store(req, res) {
        const Schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if(!(await Schema.isValid(req.body))){
            return res.status(401).json({ error: `Falha na validação` })
        }
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
        const Schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6)
              .when('oldPassword', (oldPassword, field) =>
                  oldPassword ? field.required() : field 
              )
        })

        if(!(await Schema.isValid(req.body))) {
            return res.status(401).json({ error: `Falha na validação` })
        }

        const { email, oldPassword } = req.body

        const user = await User.findByPk(req.userId)

        if(email != user.email) {

            const users = await User.findOne({ where: { email } })
            if(users) { 
                return res.status(401).json({ error: "Email Já existe" })
            }
        }

       if(oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "Senha Incorreta" })
       }

       const { id, name, provider } = await user.update(req.body)

       return res.status(200).json({
           id,
           email,
           provider,
           name
       })

    }
}

module.exports = new UserController()