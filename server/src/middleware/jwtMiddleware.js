require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;   
const tokenAlgorithm = process.env.JWT_ALGORITHM;

// The generateToken function generates a token using the payload and options provided.
module.exports.generateToken = function (req, res, next) {

    const payload = {
        accountNo: res.locals.accountNo,
        role: res.locals.role,
        timestamp: new Date()
    };

    const options = {
        algorithm: tokenAlgorithm,
        expiresIn: tokenDuration,
    };

    const callback = (err, token) => {
        if (err) {
            console.error("Error jwt:", err);
            res.status(500).json(err);
        } else {
            res.locals.token = token;
            next();
        }
    };

    const token = jwt.sign(payload, secretKey, options, callback);
};

// The sendToken function sends the token to the client.
module.exports.sendToken = function (req, res, next) {
    res.status(200).json({
        message: res.locals.message,
        token: res.locals.token,
        accountNo: res.locals.accountNo,
        role: res.locals.role,
    });
};

// The verifyToken function verifies the token provided in the request header.
module.exports.verifyToken = function (req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    const callback = function (err, decoded) {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        res.locals.accountNo = decoded.accountNo;
        res.locals.role = decoded.role;
        res.locals.tokenTimestamp = decoded.timestamp;

        next();
    };

    jwt.verify(token, secretKey, callback);
};

// The verifyIsAdmin function checks if the user has the administrator role.
module.exports.verifyIsAdmin = function (req, res, next){

    console.log(res.locals.role, typeof(res.locals.role))
    if (res.locals.role !== 2) {
        return res.status(403).json({ error: 'Requires administrator role.' });
    }
    next();

};