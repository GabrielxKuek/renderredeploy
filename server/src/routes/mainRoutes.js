import express from "express";
const router = express.Router();

//==============================================================//
//                     Importing Routes                         //
//==============================================================//

import creationRoutes from "./creationRoute.js";
import deletionRoutes from "./deletionRoute.js";
import modificationRoutes from "./modificationRoute.js";
import requestRoutes from "./requestRoute.js";

//==============================================================//
//                     Defining Routes                          //
//==============================================================//

router.use("/creation", creationRoutes);

router.use("/deletion", deletionRoutes);

router.use("/modification", modificationRoutes);

router.use("/request", requestRoutes);

export default router;
