const express = require('express');
const authController = require('../../auth/authController');
const router = express.Router();

router.post('/token', authController.generateToken)

module.exports = router;
