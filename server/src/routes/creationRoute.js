import express from "express";
const router = express.Router();
import { logRequestMiddleware } from "../middlewares/logRequestMiddleware.js";
import * as creationController from "../controllers/creationController.js";
import * as jwtController from "../middlewares/jwtMiddleware.js";

// ===================
// w/o authentication
// ===================

router.post("/input", creationController.createCreation, logRequestMiddleware);

// View all creation logs
router.get("/viewAll", creationController.readCreationByAll);

// View creation log by date
router.get("/viewByDate", creationController.readCreationByDate);

// ===================
// authentication
// ===================

// router.post("/input", jwtController.verifyToken, creationController.createCreation, logRequestMiddleware);

// // View all creation logs
// router.get("/viewAll", jwtController.verifyToken, creationController.readCreationByAll);

// // View creation log by date
// router.get("/viewByDate", jwtController.verifyToken, creationController.readCreationByDate);

// ===================
// deprecated
// ===================

// // View creation log by ip
// router.get("/viewByIp", creationController.readCreationByIp);

// // View  creation log by Operating System
// router.get("/viewByOs", creationController.readCreationByOs);

export default router;
