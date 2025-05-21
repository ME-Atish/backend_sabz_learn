const express = require("express");

const ticketController = require("../../controllers/v1/ticket");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, ticketController.getAll)
  .post(authMiddleware, ticketController.create);

router.route("/user").get(authMiddleware, ticketController.userTicket);
router.route("/:id/answer").get(authMiddleware, ticketController.getAnswer);

router
  .route("/answer")
  .post(authMiddleware, isAdminMiddleware, ticketController.setAnswer);

module.exports = router;
