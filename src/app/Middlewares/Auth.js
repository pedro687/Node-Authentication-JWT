const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const authConfig = require('../../config/Auth')

module.exports = async(req, res, next) => {
    const verifiedToken = req.headers.authorization
    if(!verifiedToken) {
        return res.status(401).json({ error: "Token not found" })
    }

    const [, token] = verifiedToken.split(" ")

    try{
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        console.log(decoded)
        req.userId = decoded.id

        return next()

    }catch(err) {
        return res.status(401).json({ error: "Token Invalid" })
    }

}