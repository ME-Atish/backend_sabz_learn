const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");

const contactModel = require("../../models/contact");

exports.create = async (req, res) => {
  const { name, phone, email, body } = req.body;

  const contact = await contactModel.create({
    name,
    phone,
    email,
    body,
    isAnswer: 0,
  });

  if (!contact) {
    return res.status(500).json({
      message: "An error given when try to create field",
    });
  }

  return res.status(201).json(contact);
};

exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({});
  return res.json(contacts);
};

exports.delete = async (req, res) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isValidObjectId) {
    return res.status(409).json({ message: "The id is not valid" });
  }

  const deletedMessage = await contactModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedMessage) {
    res.status(404).json({
      message: "The message not found",
    });
  }

  return res.json(deletedMessage);
};

exports.answer = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamzecarno@gmail.com",
      pass: "fgbbreirhrmitqbf",
    },
  });

  const mailOption = {
    from: "hamzecarno@gmail.com",
    to: req.body.email,
    subject: "پاسخ پیغام شما",
    text: req.body.answer,
  };

  transporter.sendMail(mailOption, async (err, info) => {
    if (err) {
      return res.json(err);
    } else {
      const contact = await contactModel.findOneAndUpdate(
        { email: req.body.email },
        {
          isAnswer: 1,
        }
      );
      return res.json({ message: "Email sent successfully" });
    }
  });
};
