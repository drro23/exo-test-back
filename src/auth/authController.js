const authService = require('./authService');

const generateToken = (req, res) => {
    const token = authService.generateAccessToken({email: req.body.email})
    const response = {
        "accessToken": token
    }
    return res.json(response)
}

module.exports = {
    generateToken
}
