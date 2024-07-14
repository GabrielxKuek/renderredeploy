const express = require('express');
const logController = require('../controllers/logController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware.verifyToken, jwtMiddleware.verifyIsAdmin);

router.get('/viewAll', logController.readAll)

module.exports = router