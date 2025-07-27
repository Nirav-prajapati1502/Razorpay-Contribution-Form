const express = require('express');
const router = express.Router();
const { createOrder } = require('./contributionController');

router.post('/createorder', createOrder);

module.exports = router;