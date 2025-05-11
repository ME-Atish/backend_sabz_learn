const express = require("express");

const authMiddleware = require("../../middlewares/auth.js");
const commentController = require("../../controllers/v1/comment");

const router = express.Router();

router.route("/").post(authMiddleware , commentController.create)

module.exports = router;
