const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res , next) => {
  try {
    const authHeader = req.header("Authorization").split("");

    if (authHeader != 2) {
      return res
        .res(403)
        .json({ message: "This route protected and you can't access to it" });
    }

    const token = authHeader[1];
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(jwtPayload.id).lean();
    Reflect.deleteProperty(user, "password");

    req.user = user;

    next()
  } catch (error) {
    return res.json(error);
  }
};
