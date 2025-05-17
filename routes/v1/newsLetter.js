const express = require("express");

const newsLetterController = require("../../controllers/v1/newsLetter.js");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, newsLetterController.getAll)
  .post(newsLetterController.create);


module.exports = router