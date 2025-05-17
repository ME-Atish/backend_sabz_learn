const courseModel = require("../../models/course");

exports.get = async (req, res) => {
  const { keyword } = req.params;

  const search = await courseModel.find({
    description: { $regex: ".*" + keyword + ".*" },
  });

  return res.json(search);
};
