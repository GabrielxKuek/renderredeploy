//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();

//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const accessSecretKey = process.env.JWT_ACCESS_SECRET_KEY;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const resetPasswordSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const emailVerificationSecretKey =
  process.env.JWT_EMAIL_VERIFICATION_SECRET_KEY;

const accessTokenDuration = process.env.JWT_ACCESS_EXPIRES_IN;
const refreshTokenDuration = process.env.JWT_REFRESH_EXPIRES_IN;
const resetPasswordTokenDuration = process.env.JWT_RESET_PASSWORD_EXPIRES_IN;
const emailVerificationTokenDuration =
  process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN;

const tokenAlgorithm = process.env.JWT_ALGORITHM;

// STORE IN COOKIE
module.exports.generateLoginAccessToken = (req, res, next) => {
  console.log("Access Token Middleware");
  const payload = {
    user_id: res.locals.user_id,
    site_id: req.params.site_id,
    issued_at: Math.floor(Date.now() / 1000),
  };

  const options = {
    algorithm: tokenAlgorithm,
    expiresIn: accessTokenDuration,
  };

  const callback = (err, token) => {
    if (err) {
      console.error("Error Generating Access Token JWT:", err);
      res.status(500).json(err);
    } else {
      res.status(200).json({ access_token: token });
    }
  };

  jwt.sign(payload, accessSecretKey, options, callback);
};

module.exports.generateRefreshToken = (req, res, next) => {
  console.log("Refresh Token Middleware");

  const payload = {
    issued_at: Date.now(),
  };

  const options = {
    algorithm: tokenAlgorithm,
    expiresIn: refreshTokenDuration,
  };

  const callback = (err, token) => {
    if (err) {
      console.error("Error Generating Refresh Token JWT:", err);
      res.status(500).json(err);
    } else {
      if (req.cookies.refresh_token != token) {
        console.log(req.cookies.refresh_token != token);
        res.clearCookie("refresh_token", {
          httpOnly: true,
        });
      }

      // Store the token in a cookie
      res.cookie("refresh_token", token, {
        httpOnly: true,
        maxAge: 86000000,
        sameSite: "None",
        secure: true,
        domain: ".onrender.com",
      });

      res.locals.refresh_token = token;
      console.log("Refresh Token Response Headers:", res.getHeaders());
      next();
    }
  };

  jwt.sign(payload, refreshSecretKey, options, callback);
};

// Verify token
module.exports.verifyToken = (req, res, next) => {
  console.log("Verify Token Middleware");
  let access_token;

  // Check token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    access_token = req.headers.authorization.substring(7);
    console.log("Access Token:", access_token);
  }

  if (!access_token) {
    console.log("No access token");
    return res.status(401).json({ message: "Not Authenticated" });
  }

  try {
    jwt.verify(access_token, accessSecretKey, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Token expired");
          return res.status(401).json({ message: "Token expired" });
        } else {
          console.log("Invalid token");
          return res.status(401).json({ message: "Invalid token" });
        }
      } else {
        console.log("Decoded:", decoded);
        res.locals.user_id = decoded.user_id;
        res.locals.site_id = decoded.site_id;
        console.log(res.locals.user_id);
        console.log(res.locals.site_id);
        next();
      }
    });
  } catch (error) {
    console.log("verify token" + error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports.checkRefreshTokenValidTime = async (req, res, next) => {
  let token;
  console.log(req.cookies);

  // Check token in cookies
  if (req.cookies.refresh_token) {
    token = req.cookies.refresh_token;
  }

  // if token wasn't in the cookies, will be blocked since the prev middlewares
  if (!token) {
    return res
      .status(401)
      .json({ error: "Refresh token expired or not included" });
  }
  try {
    console.log(req.cookies.refresh_token);
    const decoded = jwt.verify(token, refreshSecretKey);

    console.log(Date.now());
    console.log(decoded.issued_at);
    console.log(Date.now() - decoded.issued_at);
    console.log(refreshTokenDuration);

    // if ((Date.now() - decoded.issued_at) > (refreshTokenDuration - 21600000)) {
    if (Date.now() - decoded.issued_at > 0) {
      console.log(req.cookies.refresh_token);
      next();
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports.generateResetPasswordToken = (req, res, next) => {
  console.log("Reset Password Token Middleware");
  const { user_id } = res.locals;
  res.locals.service_id = 1;

  const payload = {
    user_id,
    issued_at: Math.floor(Date.now() / 1000),
  };

  const options = {
    algorithm: tokenAlgorithm,
    expiresIn: resetPasswordTokenDuration,
  };

  const callback = (err, token) => {
    if (err) {
      console.error("Error Generating Reset Password JWT: ", err);
      res.status(500).json(err);
    } else {
      res.locals.token = token;
      console.log("Reset Password Token: ", token);
      next();
    }
  };

  jwt.sign(payload, resetPasswordSecretKey, options, callback);
};

// Check if the token has not expired
module.exports.verifyResetPasswordToken = (req, res, next) => {
  console.log("Verify Reset Password Token Middleware");

  const { token } = req.body;
  console.log(token);

  try {
    const decoded = jwt.verify(token, resetPasswordSecretKey);
    console.log("Reset Password Token Decoded: ", decoded);
    res.locals.user_id = decoded.user_id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports.generateEmailVerificationToken = (req, res, next) => {
  console.log("Email Verification Token Middleware");
  const { user_id } = res.locals;

  const payload = {
    user_id,
    issued_at: Math.floor(Date.now() / 1000),
  };

  const options = {
    algorithm: tokenAlgorithm,
    expiresIn: emailVerificationTokenDuration,
  };

  const callback = (err, token) => {
    if (err) {
      console.error("Error Generating Verification Token JWT: ", err);
      res.status(500).json(err);
    } else {
      res.locals.verification_token = token;
      console.log("Verification Token: ", token);
      next();
    }
  };

  jwt.sign(payload, emailVerificationSecretKey, options, callback);
};

// Check if the token has not expired
module.exports.verifyEmailVerificationToken = (req, res, next) => {
  console.log("Verify Email Verification Token Middleware");

  const { token } = req.body;
  console.log(token);

  try {
    const decoded = jwt.verify(token, emailVerificationSecretKey);
    console.log(decoded);
    res.locals.user_id = decoded.user_id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
