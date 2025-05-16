const express = require("express");

const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");
const contactController = require("../../controllers/v1/contact");

const router = express.Router();

router
  .route("/")
  .post(contactController.create)
  .get(authMiddleware, isAdminMiddleware, contactController.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, contactController.delete);

module.exports = router;
