const express = require("express");
const router = express.Router();
const deletionController = require("../controllers/deletionController");

router.post("/insert", deletionController.createDeletion);
router.get("/viewAll", deletionController.readDeletionByAll);
router.get("/viewByDate", deletionController.readDeletionByDate);
router.get("/viewByIp", deletionController.readDeletionByIp);
router.get("/viewByOs", deletionController.readDeletionByOs);

module.exports = router;