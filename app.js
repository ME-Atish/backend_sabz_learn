const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const categoryRouter = require("./routes/v1/category");
const courseRouter = require("./routes/v1/course");
const commentRouter = require("./routes/v1/comment");
const contactRouter = require("./routes/v1/contact");
const newsLetterRouter = require("./routes/v1/newsLetter");
const searchRouter = require("./routes/v1/search");

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
app.use("/v1/course", courseRouter);
app.use("/v1/comment", commentRouter);
app.use("/v1/contact", contactRouter);
app.use("/v1/newsletter", newsLetterRouter);
app.use("/v1/search", searchRouter);

module.exports = app;
