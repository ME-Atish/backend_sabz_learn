const express = require("express");

const categoryController = require("../../controllers/v1/category");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router.get("/", categoryController.getAll);

router.post("/", authMiddleware, isAdminMiddleware, categoryController.create);

router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  categoryController.remove
);

router.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  categoryController.update
);

module.exports = router;
