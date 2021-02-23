const sqlDatabase = require('../../utils/sqlDatabase');
const catchAsync = require('../../utils/catchAsync');
const constants = require('../../utils/constants');

const justifyLimitMiddleware = catchAsync(async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let userLimit = await sqlDatabase.selectUserLimit(token)
    if (Object.entries(userLimit).length === 0) {
        let wordsCount = 0;
        if (Object.entries(req.body).length !== 0) {
            console.log(`justifyLimitMiddleware bodyLength ${req.body.split(' ').length}`);
            wordsCount = req.body.split(' ').length;
        }
        await sqlDatabase.addUserTokenLimit(token, wordsCount, Date.now())
        next();
    }
    if (userLimit?.justifyWords + req.body?.split(' ').length >= constants.WORD_LIMIT) {
        let userDateTime = new Date(parseInt(userLimit.userDateTime));
        let verificationDateTime = Date.now();
        let newWordsLength = 0;
        verificationDateTime.setTime(verificationDateTime.getTime() - 24);

        if (userDateTime > verificationDateTime) {
            if (Object.entries(req.body).length !== 0) {
                newWordsLength = req.body.split(' ').length;
            }
            await sqlDatabase.updateUserLimitWordsAndDate(token, newWordsLength, Date.now());
            next();
        } else {
            res.status(402);
            return res.send();
        }
    } else {
        if (Object.entries(req.body).length !== 0) {
            let newWordsLength = userLimit.justifyWords + req.body.split(' ').length;
            await sqlDatabase.updateUserLimitWords(token, newWordsLength);
        }
    }
    next();
})

module.exports = justifyLimitMiddleware;
