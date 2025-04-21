const express = require("express");
const controller = require("../../controllers/v1/auth.js");

const router = express.Router();

router.get("/me", controller.getMe);

router.post("/register", controller.register);
router.post("/login", controller.login);


module.exports = router