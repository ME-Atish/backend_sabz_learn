const express = require("express");
const multer = require("multer");

const articleController = require("../../controllers/v1/article");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");
const multerStorage = require("./../../utils/uploader.js");

const router = express.Router();

router
  .route("/")
  .get(articleController.getAll)
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: { fieldSize: 10000000 } }).single(
      "cover"
    ),
    articleController.create
  );

router
  .route("/draft")
  .get(authMiddleware, isAdminMiddleware, articleController.getAllDraft)
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: { fieldSize: 10000000 } }).single(
      "cover"
    ),
    articleController.draft
  );

router.route("/:category").get(articleController.getByCategory);

router.route("/getOne/:href").get(articleController.getOne);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, articleController.delete);

module.exports = router;
