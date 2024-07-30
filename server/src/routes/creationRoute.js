import express from "express";
const router = express.Router();
import * as creationController from "../controllers/creationController.js";
//import * as creationController from "../controllers-testing-dummydata/creationController.js";

router.post("/input", creationController.createCreation);

router.get("/viewAll", creationController.readCreationByAll);
router.get("/viewByDate", creationController.readCreationByDate);
router.get("/viewByIp", creationController.readCreationByIp);
router.get("/viewByOs", creationController.readCreationByOs);

export default router;

console.log( creationController.createCreation)