const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 4000;

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to MongoDB");
})();

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
