const express = require('express');
const logController = require('../controllers/logController');
const jwtMiddleware = require('../middleware/jwtMiddleware');


const router = express.Router();

router.use(jwtMiddleware.verifyToken, jwtMiddleware.verifyIsAdmin);

router.get('/viewAll', logController.readAll)
router.get('/logNew/:table_name', logController.newCreationLog)
router.get('/logChange/:table_name', logController.newModificationLog, logController.newModificationLogDetail)

module.exports = router