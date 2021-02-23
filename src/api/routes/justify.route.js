const express = require('express');
const justifyTextController = require('../controllers/JustifyTextController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/justify', authMiddleware, justifyTextController.justifyText);

module.exports = router;
