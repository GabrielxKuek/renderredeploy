import express from "express";
const router = express.Router();
// import * as modificationController from "../controllers/modificationController.js";
import * as modificationController from "../controllers-testing-dummydata/modificationController.js";

router.post("/input", modificationController.createModification);

router.get("/viewAll", modificationController.readModificationByAll);
router.get("/viewByDate", modificationController.readModificationByDate);
router.get("/viewByIp", modificationController.readModificationByIp);
router.get("/viewByOs", modificationController.readModificationByOs);

export default router;