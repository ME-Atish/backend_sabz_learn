const express = require("express");

const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");
const commentController = require("../../controllers/v1/comment");

const router = express.Router();

router.route("/").post(authMiddleware, commentController.create);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, commentController.delete);

router
  .route("/:id/accept")
  .put(authMiddleware, isAdminMiddleware, commentController.accept);

router
  .route("/:id/reject")
  .put(authMiddleware, isAdminMiddleware, commentController.reject);

module.exports = router;
