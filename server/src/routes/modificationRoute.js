const express = require("express");
const router = express.Router();
const modificationController = require("../controllers/modificationController");

router.post("/insert", modificationController.createModification);
router.get("/viewAll", modificationController.readModificationByAll);
router.get("/viewByDate", modificationController.readModificationByDate);
router.get("/viewByIp", modificationController.readModificationByIp);
router.get("/viewByOs", modificationController.readModificationByOs);

module.exports = router;