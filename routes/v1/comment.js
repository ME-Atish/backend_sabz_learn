const express = require("express");

const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");
const commentController = require("../../controllers/v1/comment");

const router = express.Router();

router.route("/").post(authMiddleware , commentController.create)

router.route("/:id").delete(authMiddleware, isAdminMiddleware , commentController.delete)

module.exports = router;
