const jwt = require('jsonwebtoken');

const generateAccessToken = (email) => {
    return jwt.sign(email, process.env.TOKEN_SECRET)
}

module.exports = {
    generateAccessToken
}
