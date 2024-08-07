import express from "express";
const router = express.Router();
import * as modificationController from "../controllers/modificationController.js";
// import * as modificationController from "../controllers-testing-dummydata/modificationController.js";

// Create modification log
router.post("/input", modificationController.createModification);

// View all modification logs
router.get("/viewAll", modificationController.readModificationByAll);

// View modification logs by date
router.get("/viewByDate", modificationController.readModificationByDate);

// // View modification logs by ip address
// router.get("/viewByIp", modificationController.readModificationByIp);

// // View modification logs by operating system
// router.get("/viewByOs", modificationController.readModificationByOs);

export default router;