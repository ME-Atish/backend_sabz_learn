const { default: mongoose } = require("mongoose");
const departmentModel = require("./../../models/department");
const subDepartmentModel = require("./../../models/subDepartment");

exports.getAllDepartment = async (req, res) => {
  const departments = await departmentModel.find({});

  return res.json(departments);
};

exports.createDepartment = async (req, res) => {
  const { title } = req.body;

  const createDepartment = await departmentModel.create({ title });

  return res.status(201).json(createDepartment);
};

exports.getAllSubDepartment = async (req, res) => {
  const subDepartments = await subDepartmentModel.find({});

  return res.json(subDepartments);
};

exports.deleteSub = async (req, res) => {
  const { id } = req.params;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The object id not valid" });
  }

  const deleteSubDepartment = await subDepartmentModel.findByIdAndDelete({
    _id: id,
  });

  if (!deleteSubDepartment) {
    return res.status(404).json({ message: "The department not found" });
  }

  return res.json(deleteSubDepartment);
};

exports.createSub = async (req, res) => {
  const { title, parent } = req.body;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(parent);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The object id not valid" });
  }

  const createSubDepartment = await subDepartmentModel.create({
    title,
    parent,
  });

  return res.status(201).json(createSubDepartment);
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The object id not valid" });
  }

  const deleteDepartment = await departmentModel.findByIdAndDelete({ _id: id });

  if (!deleteDepartment) {
    return res.status(404).json({ message: "The department not found" });
  }

  return res.json(deleteDepartment);
};
