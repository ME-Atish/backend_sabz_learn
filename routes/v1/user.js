const express = require("express");
const controller = require("../../controllers/v1/user.js");

const router = express.Router();

router.post("/ban/:id" , controller.banUser)


module.exports = router