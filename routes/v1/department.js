const express = require("express");

const departmentController = require("../../controllers/v1/department");
const authMiddleware = require("../../middlewares/auth.js");
const isAdminMiddleware = require("../../middlewares/isAdmin.js");

const router = express.Router();

router
  .route("/")
  .get(departmentController.getAllDepartment)
  .post(
    authMiddleware,
    isAdminMiddleware,
    departmentController.createDepartment
  );

router
  .route("/sub")
  .get(departmentController.getAllSubDepartment)
  .post(authMiddleware, isAdminMiddleware, departmentController.createSub);

router
  .route("/sub/:id")
  .delete(authMiddleware, isAdminMiddleware, departmentController.deleteSub);

router
  .route("/:id")  
  .delete(
    authMiddleware,
    isAdminMiddleware,
    departmentController.deleteDepartment
  );

module.exports = router;
