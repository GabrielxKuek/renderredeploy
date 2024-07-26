const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
