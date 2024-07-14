const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const taskProgressRoutes = require("./taskProgressRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const shopRoutes = require("./shopRoutes");
const ecoGuardianRoutes = require("./ecoGuardianRoutes");
const userGuardianRoutes = require("./userGuardianRoutes");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const exampleController = require("../controllers/exampleController");
const messageRoutes = require('./messageRoutes');


router.post(
  "/jwt/generate",
  exampleController.preTokenGenerate,
  jwtMiddleware.generateToken,
  exampleController.beforeSendToken,
  jwtMiddleware.sendToken
);

router.get(
  "/jwt/verify",
  jwtMiddleware.verifyToken,
  exampleController.showTokenVerified
);

router.post(
  "/bcrypt/compare",
  exampleController.preCompare,
  bcryptMiddleware.comparePassword,
  exampleController.showCompareSuccess
);

router.post(
  "/bcrypt/hash",
  bcryptMiddleware.hashPassword,
  exampleController.showHashing
);

router.use("/users", userRoutes);


module.exports = router;