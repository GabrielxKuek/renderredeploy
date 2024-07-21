require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}`);
});
