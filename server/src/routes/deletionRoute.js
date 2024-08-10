import express from "express";
const router = express.Router();
import * as deletionController from "../controllers/deletionController.js";
// import * as deletionController from "../controllers-testing-dummydata/deletionController.js";
import * as jwtController from "../middlewares/jwtMiddleware.js";

// Create deletion log
router.post("/input", deletionController.createDeletion);

// View all deletion logs
// router.get("/viewAll", deletionController.readDeletionByAll);
router.get("/viewAll", jwtController.verifyToken, deletionController.readDeletionByAll);

// View deletion logs by date
router.get("/viewByDate", deletionController.readDeletionByDate);

// // View deletion logs by ip address
// router.get("/viewByIp", deletionController.readDeletionByIp);

// // View deletion logs by operating system
// router.get("/viewByOs", deletionController.readDeletionByOs);

export default router;