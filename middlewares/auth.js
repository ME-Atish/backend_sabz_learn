const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization")?.split(" ");

    if (authHeader?.length != 2) {
      return res
        .status(403)
        .json({ message: "This route protected and you can't access to it" });
    }

    const token = authHeader[1];
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(jwtPayload.id);

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
