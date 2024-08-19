import express from 'express';
const router = express.Router();
import * as requestController from '../controllers/requestController.js';
import * as jwtController from "../middlewares/jwtMiddleware.js";

// insert request

router.post('/input', jwtController.verifyToken, requestController.createRequest);

// ===================
// select all request
// ===================

router.get('/viewAll', /*jwtController.verifyToken,*/ requestController.readAllRequestBySite);
router.get('/viewAllByDate', /*jwtController.verifyToken,*/ requestController.readAllRequestByDate);
router.get('/viewAllByIp', /*jwtController.verifyToken,*/ requestController.readAllRequestByIp);
router.get('/viewAllByOs', /*jwtController.verifyToken,*/ requestController.readAllRequestByOs);

// router.get('/viewAll', requestController.readAllRequestBySite);
// router.get('/viewAllByDate', requestController.readAllRequestByDate);
// router.get('/viewAllByIp', requestController.readAllRequestByIp);
// router.get('/viewAllByOs', requestController.readAllRequestByOs);

// ===================
// select get request
// ===================

router.get('/viewGetByDate', jwtController.verifyToken, requestController.readGetRequestByDate);
router.get('/viewGetByIp', jwtController.verifyToken, requestController.readGetRequestByIp);
router.get('/viewGetByOs', jwtController.verifyToken, requestController.readGetRequestByOs);

// router.get('/viewGetByDate', requestController.readGetRequestByDate);
// router.get('/viewGetByIp', requestController.readGetRequestByIp);
// router.get('/viewGetByOs', requestController.readGetRequestByOs);

// ===================
// select post request
// ===================

router.get('/viewPostByDate', jwtController.verifyToken, requestController.readPostRequestByDate);
router.get('/viewPostByIp', jwtController.verifyToken, requestController.readPostRequestByIp);
router.get('/viewPostByOs', jwtController.verifyToken, requestController.readPostRequestByOs);

// router.get('/viewPostByDate', requestController.readPostRequestByDate);
// router.get('/viewPostByIp', requestController.readPostRequestByIp);
// router.get('/viewPostByOs', requestController.readPostRequestByOs);

// ===================
// select put request
// ===================

router.get('/viewPutByDate', jwtController.verifyToken, requestController.readPutRequestByDate);
router.get('/viewPutByIp', jwtController.verifyToken, requestController.readPutRequestByIp);
router.get('/viewPutByOs', jwtController.verifyToken, requestController.readPutRequestByOs);

// router.get('/viewPutByDate', requestController.readPutRequestByDate);
// router.get('/viewPutByIp', requestController.readPutRequestByIp);
// router.get('/viewPutByOs', requestController.readPutRequestByOs);

// ===================
// select delete request
// ===================

router.get('/viewDeleteByDate', jwtController.verifyToken, requestController.readDeleteRequestByDate);
router.get('/viewDeleteByIp', jwtController.verifyToken, requestController.readDeleteRequestByIp);
router.get('/viewDeleteByOs', jwtController.verifyToken, requestController.readDeleteRequestByOs);

// router.get('/viewDeleteByDate', requestController.readDeleteRequestByDate);
// router.get('/viewDeleteByIp', requestController.readDeleteRequestByIp);
// router.get('/viewDeleteByOs', requestController.readDeleteRequestByOs);

export default router;