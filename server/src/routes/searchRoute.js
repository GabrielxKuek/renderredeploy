import express from "express";
const router = express.Router();
import * as searchController from "../controllers/searchController.js";
// import * as searchController from "../controllers-testing-dummydata/searchController.js";

// Search logs
router.get("/creation", searchController.searchLogsCreate);
router.get("/modification", searchController.searchLogsModification);
router.get("/deletion", searchController.searchLogsDelete);


export default router;