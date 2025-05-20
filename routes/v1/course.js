const express = require("express");
const multer = require("multer");

const multerStorage = require("../../utils/uploader.js");
const courseController = require("../../controllers/v1/course.js");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router
  .route("/session")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllSession);

router.route("/presell").get(courseController.presell);

router.route("/popular").get(courseController.popular);

router.route("/category/:href").get(courseController.getCategory);

router.route("/related/:href").get(courseController.getRelated);

router.route("/:href").get(authMiddleware, courseController.getOne);

router.route("/:href/:sessionId").get(courseController.getSessionInfo);

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

router.route("/:id/register").post(authMiddleware, courseController.register);

router
  .route("/session/:id")
  .delete(authMiddleware, isAdminMiddleware, courseController.deleteSession);

module.exports = router;

