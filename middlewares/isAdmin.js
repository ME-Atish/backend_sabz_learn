module.exports = async (req, res, next) => {
  const isAdmin = req.user.role === "ADMIN";

  if (!isAdmin) {
    return res.status(403).json({ message: "This route only can use by admins" });
  }

  next();
};
