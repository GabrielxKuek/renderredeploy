const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const exampleController = require("../controllers/exampleController");
const logRoutes = require("./logRoutes");


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

router.use("/logs", logRoutes);


module.exports = router;