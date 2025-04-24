const { isValidObjectId } = require("mongoose");

const categoryModel = require("../../models/category");
const categoryValidation = require("../../validators/category");

exports.create = async (req, res) => {
  const categoryResult = categoryValidation(req.body);

  if (!categoryResult) {
    return res.status(422).json(categoryResult);
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

exports.remove = async (req, res) => {
  const isValidUserId = isValidObjectId(req.params.id);

  if (!isValidUserId) {
    return res.status(409).json({ message: "User Id is not valid" });
  }

  const removeCategory = await categoryModel.findByIdAndDelete({
    _id: req.params.id,
  });

  if (!removeCategory) {
    return res.status(404).json({ message: "category not found" });
  }

  return res.status(201).json({ message: "category deleted successfully" });
};

exports.update = async (req, res) => {
  const isValidId = isValidObjectId(req.params.id);

  if (!isValidId) {
    return res.status(422).json({ message: "Id is not valid" });
  }

  const categoryResult = categoryValidation(req.body);

  console.log()

  if (!categoryResult) {
    return res.status(422).json(categoryResult);
  }

  const { title, href } = req.body;

  const category = await categoryModel.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      title,
      href,
    }
  );

  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }

  return res.status(201).json({message :"Category updated successfully"});
};
