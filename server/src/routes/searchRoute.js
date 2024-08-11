import express from "express";
const router = express.Router();
import * as searchController from "../controllers/searchController.js";
import * as jwtController from "../middlewares/jwtMiddleware.js";

// ===================
// w/o authentication
// ===================

// Search creation logs
router.get("/creation", searchController.getCreationLogs);

// Search modificaton logs
router.get("/modification", searchController.getModificationLogs);

// Search deletion logs
router.get("/deletion", searchController.getDeletionLogs);

// Search request logs
router.get("/request", searchController.searchLogsRequest);

// ===================
// authentication
// ===================

// // Search creation logs
// router.get("/creation", jwtController.verifyToken, searchController.searchLogsCreate);

// // Search modificaton logs
// router.get("/modification", jwtController.verifyToken, searchController.searchLogsModification);

// // Search deletion logs
// router.get("/deletion", jwtController.verifyToken, searchController.searchLogsDelete);

// // Search request logs
// router.get("/request", jwtController.verifyToken, searchController.searchLogsRequest)


export default router;