const express = require("express");
const controller = require("../../controllers/v1/user.js");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router.get("/", authMiddleware, isAdminMiddleware, controller.getAll);

router.post("/ban/:id", authMiddleware, isAdminMiddleware, controller.banUser);

router.delete("/:id", authMiddleware, isAdminMiddleware, controller.removeUser);

router.put("/", authMiddleware, controller.updateUser);
router.put("/role", authMiddleware, isAdminMiddleware, controller.changeRole);

module.exports = router;
