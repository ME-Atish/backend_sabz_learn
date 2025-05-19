const express = require("express");

const offerController = require("../../controllers/v1/off");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, offerController.getAll)
  .post(authMiddleware, isAdminMiddleware, offerController.create);

router
  .route("/all")
  .post(authMiddleware, isAdminMiddleware, offerController.setOnAll);

router.route("/:code").post(authMiddleware, offerController.getOne);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, offerController.delete);

module.exports = router