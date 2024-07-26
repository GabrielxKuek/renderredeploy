const express = require("express");
const router = express.Router();
const creationController = require("../controllers/creationController");

router.get("/viewAll", creationController.readAll);
router.get("/viewByDate", creationController.readAllByDate);
router.get("/viewByIp", creationController.readAllByIp);
router.get("/viewByOs", creationController.readAllByOs);
