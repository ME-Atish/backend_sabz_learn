const express = require("express");
const app = express();
const authRouter = require("./routes/v1/auth");

app.use("/v1/auth", authRouter);

module.exports = app;
