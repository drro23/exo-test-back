const authService = require('./authService');

const generateToken = (req, res) => {
    if (req.body.email === undefined) {
        return res.sendStatus(400);
    }
    const token = authService.generateAccessToken({email: req.body.email})
    const response = {
        "accessToken": token
    }
    return res.json(response)
}

module.exports = {
    generateToken
}
