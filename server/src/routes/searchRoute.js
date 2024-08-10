import express from "express";
const router = express.Router();
import * as searchController from "../controllers/searchController.js";
import * as jwtController from "../middlewares/jwtMiddleware.js";
// import * as searchController from "../controllers-testing-dummydata/searchController.js";

// Search logs
router.get("/creation", jwtController.verifyToken, searchController.searchLogsCreate);
router.get("/modification", jwtController.verifyToken, searchController.searchLogsModification);
router.get("/deletion", jwtController.verifyToken, searchController.searchLogsDelete);
// router.get("/request", jwtController.verifyToken, searchController.searchLogsRequest)


export default router;