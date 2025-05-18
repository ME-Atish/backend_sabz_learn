const express = require("express");
const router = express.Router();

const notificationController = require("../../controllers/v1/notification");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, notificationController.create)
  .get(authMiddleware, isAdminMiddleware, notificationController.getAll);

router
  .route("/admins")
  .get(authMiddleware, isAdminMiddleware, notificationController.get);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, notificationController.delete);


module.exports = router