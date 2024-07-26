const express = require("express");
const router = express.Router();
const creationController = require("../controllers/creationController");

router.post("/insert", creationController.createCreation);
router.get("/viewAll", creationController.readCreationByAll);
router.get("/viewByDate", creationController.readCreationByDate);
router.get("/viewByIp", creationController.readCreationByIp);
router.get("/viewByOs", creationController.readCreationByOs);

module.exports = router;