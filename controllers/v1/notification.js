const notificationModel = require("../../models/notification");

exports.create = async (req, res) => {
  const { message, admin } = req.body;

  const notification = await notificationModel.create({
    message,
    admin,
  });

  return res.status(201).json(notification);
};

exports.get = async (req, res) => {
  const { _id } = req.user;
  const adminNotification = await notificationModel.find({ admin: _id });

  return res.json(adminNotification);
};

exports.getAll = async (req, res) => {
  const notifications = await notificationModel.find({});
  return res.json(notifications);
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  const deletedNotification = await notificationModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedNotification) {
    return res.status(404).json({
      message: "The notification not found",
    });
  }

  return res.json(deletedNotification);
};
