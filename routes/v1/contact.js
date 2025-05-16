const express = require("express");

const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");
const contactController = require("../../controllers/v1/contact");

const router = express.Router();

module.exports = router;
