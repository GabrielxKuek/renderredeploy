const bcrypt = require("bcrypt");
const saltRounds = 10;

// The comparePassword function compares the password in the request body with the hash in res.locals.hash
module.exports.comparePassword = function (req, res, next) {
    // Check password
    const callback = (err, isMatch) => {
        if (err) {
            console.error("Error bcrypt:", err);
            res.status(500).json(err);
        } else if (isMatch) {
                next();
            } else {
                res.status(401).json({
                    message: "Wrong password",
                });
            }
    };

    bcrypt.compare(req.body.password, res.locals.hash, callback);
};

// The hashPassword function hashes the password in the request body
module.exports.hashPassword = function (req, res, next) {
    const callback = (err, hash) => {
        if (err) {
            console.error("Error bcrypt:", err);
            res.status(500).json(err);
        } else {
            res.locals.hash = hash;
            next();
        }
    };
    console.log(req.body.password, saltRounds)
    bcrypt.hash(req.body.password, saltRounds, callback);
};