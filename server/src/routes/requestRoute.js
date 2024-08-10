import express from 'express';
const router = express.Router();
import * as requestController from '../controllers/requestController.js';

// insert request

router.post('/input', requestController.createRequest);

// select all request

router.get('/viewAllBySite', requestController.readAllRequestBySite);
router.get('/viewAllByDate', requestController.readAllRequestByDate);
router.get('/viewAllByIp', requestController.readAllRequestByIp);
router.get('/viewAllByOs', requestController.readAllRequestByOs);

// select get request
router.get('/viewGetByDate', requestController.readGetRequestByDate);
router.get('/viewGetByIp', requestController.readGetRequestByIp);
router.get('/viewGetByOs', requestController.readGetRequestByOs);

// select post request
router.get('/viewPostByDate', requestController.readPostRequestByDate);
router.get('/viewPostByIp', requestController.readPostRequestByIp);
router.get('/viewPostByOs', requestController.readPostRequestByOs);

// select put request
router.get('/viewPutByDate', requestController.readPutRequestByDate);
router.get('/viewPutByIp', requestController.readPutRequestByIp);
router.get('/viewPutByOs', requestController.readPutRequestByOs);

// select delete request
router.get('/viewDeleteByDate', requestController.readDeleteRequestByDate);
router.get('/viewDeleteByIp', requestController.readDeleteRequestByIp);
router.get('/viewDeleteByOs', requestController.readDeleteRequestByOs);

export default router;