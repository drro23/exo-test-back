
const requestReceived = (req, res, next) => {
    console.log('Request received');
    next();
}

module.exports = requestReceived;
