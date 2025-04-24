const categoryModel = require("../../models/category");
const registerResult = require("../../validators/register");

exports.create = async (req, res) => {
  const validationResult = registerResult(req.body);

  if (!validationResult) {
    return res.status(422).json(validationResult);
  }

  const { title, href } = req.body;

  const category = await categoryModel.create({ title, href });

  if (!category) {
    return res.status(500).json({ message: "Got error in server-side" });
  }

  return res.status(201).json({ category });
};

exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({});

  if (!categories) {
    return res.status(500).json({ message: "Got error in server-side" });
  }

  return res.json(categories);
};

exports.remove = async (req, res) => {};

exports.update = async (req, res) => {};
