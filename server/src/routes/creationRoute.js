import express from "express";
const router = express.Router();
// import { logRequestMiddleware } from "../middleware/logRequestMiddleware.js";
// import * as creationController from "../controllers/creationController.js";
import * as creationController from "../controllers/creationController.js";

// Create creation log
router.post("/input", creationController.createCreation);
    // , logRequestMiddleware);

// View all creation logs
router.get("/viewAll", creationController.readCreationByAll);

// View creation log by date
router.get("/viewByDate", creationController.readCreationByDate);

// // View creation log by ip
// router.get("/viewByIp", creationController.readCreationByIp);

// // View  creation log by Operating System
// router.get("/viewByOs", creationController.readCreationByOs);

export default router;
