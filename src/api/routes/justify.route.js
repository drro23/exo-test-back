const express = require('express');
const justifyTextController = require('../controllers/justifyTextController');
const authMiddleware = require('../middlewares/authMiddleware');
const justifyLimitMiddleware = require('../middlewares/justifyLimitMiddleware');
const router = express.Router();

router.post('/justify', authMiddleware, justifyLimitMiddleware, justifyTextController.justifyText);

module.exports = router;
