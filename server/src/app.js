const express = require('express');
const createHttpError = require('http-errors');

const authRoute = require('./routes/auth');
const mainRoutes = require('./routes/mainRoutes');

//////////////////////////
// Task 2 Related Routers
//////////////////////////
const logRoute = require('./routes/logRoutes')

const app = express();
app.use(express.json()); // to process JSON in request body


app.use(express.static('public'));

app.use("/task6", mainRoutes);

app.use('/modules', modulesRoute);
app.use('/reports', reportsRoute);
app.use('/students', studentsRoute);
app.use('/staff', staffRoute);
app.use('/auth', authRoute);

/////////////////////////
// Task 2 Related Routes
/////////////////////////
app.use('/task6/logs/:siteid', logRoute)

app.use(function (req, res, next) {
    return next(createHttpError(404, `Unknown Resource ${req.method} ${req.originalUrl}`));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({ error: err.message || 'Unknown Server Error!' });
});

module.exports = app;
