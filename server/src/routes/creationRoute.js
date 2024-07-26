const express = require("express");
const router = express.Router();
const creationController = require("../controllers/creationController");

router.post("/insert", creationController.create);
router.get("/viewAll", creationController.selectAll);
router.get("/viewByDate", creationController.selectAllByDate);
router.get("/viewByIp", creationController.selectAllByIp);
router.get("/viewByOs", creationController.selectAllByOs);

module.exports = {
    insertCreation,
    selectCreation,
    selectCreationByDate,
    selectCreationIp,
    selectCreationOs,
};