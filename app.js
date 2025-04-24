const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const categoryRouter = require("./routes/v1/category");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/course/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);

app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/category", categoryRouter);

module.exports = app;
