import express from "express";
const router = express.Router();
import * as searchController from "../controllers/searchController.js";
import * as jwtController from "../middlewares/jwtMiddleware.js";

// Search creation logs
router.get("/creation", searchController.searchLogsCreate);

// Search modificaton logs
router.get("/modification", searchController.searchLogsModification);

// Search deletion logs
router.get("/deletion", jwtController.verifyToken, searchController.searchLogsDelete);

// Search request logs
router.get("/request", jwtController.verifyToken, searchController.searchLogsRequest)


export default router;