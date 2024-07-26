const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/viewAll', requestController.readAll);

router.get('/viewByDate', requestController.readAllByDate);
router.get('/viewCreateByDate', requestController.readCreationByDate);
router.get('/viewUpdateByDate', requestController.readModificationByDate);
router.get('/viewDeleteByDate', requestController.readDeletionByDate);

router.get('/viewByIp', requestController.readAllByip);
router.get('/viewCreateByIp', requestController.readCreationByip);
router.get('/viewUpdateByIp', requestController.readModificationByip);
router.get('/viewDeleteByIp', requestController.readDeletionByip);

router.get('/viewByOs', requestController.readAllByOs);
router.get('/viewCreateByOs', requestController.readCreationByOs);
router.get('/viewUpdateByOs', requestController.readModificationByOs);
router.get('/viewDeleteByOs', requestController.readDeletionByOs);

module.exports = router 