const sqlDatabase = require('../../utils/sqlDatabase');
const catchAsync = require('../../utils/catchAsync');
const constants = require('../../utils/constants');
const moment = require('moment');

const justifyLimitMiddleware = catchAsync(async (req, res, next) => {
    if (!req.is('text'))
        return res.sendStatus(400);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let userLimit = await sqlDatabase.selectUserLimit(token)
    let requestWords = 0;
    if (Object.entries(req.body).length !== 0) {
        requestWords = req.body.split(' ').length;
    }
    if (Object.entries(userLimit).length === 0) {
        await sqlDatabase.addUserTokenLimit(token, requestWords, Date.now())
        next();
    }
    if (userLimit?.justifyWords + requestWords >= constants.WORD_LIMIT) {
        let userDateTime = moment(parseInt(userLimit.userDateTime));
        let verificationDateTime = userDateTime.add(24, 'hours');
        let todayDate = moment();
        if (userDateTime >= todayDate && todayDate <= verificationDateTime) {
            return res.sendStatus(402);
        } else if (verificationDateTime < todayDate) {
            await sqlDatabase.updateUserLimitWordsAndDate(token, requestWords, Date.now());
            next();
        }
    } else {
        let newWordsLength = userLimit.justifyWords + requestWords;
        await sqlDatabase.updateUserLimitWords(token, newWordsLength);
    }
    next();
})

module.exports = justifyLimitMiddleware;
