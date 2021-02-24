const justifyTextService = require('../services/justifyTextService');
const catchAsync = require('../../utils/catchAsync');

const justifyText = catchAsync(async (req, res) => {
    if (Object.entries(req.body).length === 0) {
        return res.type('text').send('No text to justify');
    }
    return res.type('text').send(justifyTextService(req.body, 80))
});

module.exports = {
    justifyText
};
