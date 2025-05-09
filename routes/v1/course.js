const express = require("express");
const multer = require("multer");

const multerStorage = require("../../utils/uploader.js");
const courseController = require("../../controllers/v1/course.js");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router
  .route("/:id/session")
  .post(authMiddleware, isAdminMiddleware, courseController.createSession);

  
router
  .route("/")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: 1000000000 }).single("cover"),
    courseController.create
  );

module.exports = router;
