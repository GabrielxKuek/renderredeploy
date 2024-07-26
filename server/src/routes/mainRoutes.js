const express = require("express");
const router = express.Router();

//==============================================================//
//                     Importing Routes                         //
//==============================================================//

const creationRoutes = require("./creationRoute");
const deletionRoutes = require("./deletionRoute");
const modificationRoutes = require("./modificationRoute");
const requestRoutes = require("./requestRoute");

//==============================================================//
//                     Defining Routes                          //
//==============================================================//

router.use("/creation", creationRoutes);

router.use("/deletion", deletionRoutes);

router.use("/modification", modificationRoutes);

router.use("/request", requestRoutes);

module.exports = router;
