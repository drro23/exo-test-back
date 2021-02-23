const jwt = require('jsonwebtoken');

const generateAccessToken = (email) => {
    return jwt.sign(email, process.env.TOKEN_SECRET, {expiresIn: '3600s'})
}

module.exports = {
    generateAccessToken
}
