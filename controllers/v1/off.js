const offModel = require("./../../models/off");
const courseModel = require("./../../models/course");
const { default: mongoose } = require("mongoose");

exports.getAll = async (req, res) => {
  const off = await offModel
    .find({}, "__v")
    .populate("course", "name href ")
    .populate("creator", "name ");

  return res.json(off);
};

exports.create = async (req, res) => {
  const { code, percent, course, max } = req.body;

  const newOff = await offModel.create({
    code,
    percent,
    course,
    max,
    uses: 0,
    creator: req.user._id,
  });

  return res.status(201).json(newOff);
};

exports.setOnAll = async (req, res) => {
  const { discount } = req.body;

  const courseDiscount = await courseModel.updateMany(
    {},
    {
      discount,
    }
  );

  return res.json({ message: "The discount set to all course successfully" });
};

exports.getOne = async (req, res) => {
  const { code } = req.params;
  const { course } = req.body;

  if (!mongoose.Types.ObjectId.isValid(course)) {
    return res.status(400).json({ message: "The course id not valid" });
  }

  const off = await offModel.findOne({ code, course });

  if (!off) {
    return res.status(404).json({ message: "The code not found" });
  } else if ( off.uses === off.max) {
    return res.status(409).json({ message: "The code already used" });
  }

  await offModel.findOneAndUpdate(
    { code, course },
    {
      uses: off.uses + 1,
    }
  );
  return res.json(off);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const deletedOff = offModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedOff) {
    return res.status(404).json({ message: "The offer not found" });
  }

  return res.json(deletedOff);
};
