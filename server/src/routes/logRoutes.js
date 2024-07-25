const express = require('express');
const logController = require('../controllers/logController');
const jwtMiddleware = require('../middleware/jwtMiddleware');


const router = express.Router();

router.use(jwtMiddleware.verifyToken, jwtMiddleware.verifyIsAdmin);

router.get('/viewAll', logController.readAll)
router.get('/viewCreation', logController.readAllCreation)
router.get('/viewModification', logController.readAllModification)
router.get('/viewDeletion', logController.readAllDeletion)
router.get('/logNew/:table_name', logController.newCreationLog)
router.get('/logChange/:table_name', logController.newModificationLog, logController.newModificationLogDetail)
router.get('/logDeletion/:table_name', logController.newModificationLog, logController.newModificationLogDetail)
router.get('/logRequest/:table_name', logController.newModificationLog, logController.newModificationLogDetail)
module.exports = router