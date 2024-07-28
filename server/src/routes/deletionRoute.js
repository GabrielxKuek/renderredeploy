import express from "express";
const router = express.Router();
// import * as deletionController from "../controllers/deletionController.js";
import * as deletionController from "../controllers-testing-dummydata/deletionController.js";

router.post("/input", deletionController.createDeletion);

router.get("/viewAll", deletionController.readDeletionByAll);
router.get("/viewByDate", deletionController.readDeletionByDate);
router.get("/viewByIp", deletionController.readDeletionByIp);
router.get("/viewByOs", deletionController.readDeletionByOs);

export default router;