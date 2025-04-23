const express = require("express");
const controller = require("../../controllers/v1/user.js");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router.get("/", authMiddleware, isAdminMiddleware, controller.getAll);

router.post("/ban/:id", authMiddleware, isAdminMiddleware, controller.banUser);

module.exports = router;
