const express = require('express');
const justifyTextController = require('../controllers/JustifyTextController');
const router = express.Router();

router.post('/justify', justifyTextController.justifyText);

module.exports = router;
