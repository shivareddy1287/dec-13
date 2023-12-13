const express = require("express");

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createDepartmentCtrl,
  fetchDepartmentsCtrl,
  fetchSingleDepartment,
  updateDepartmentCtrl,
  deleteDepartmentCtrl,
} = require("../../controllers/department/departmentCtrl");

const DepartmentRoutes = express.Router();
DepartmentRoutes.post("/create", authMiddleware, createDepartmentCtrl);
DepartmentRoutes.get("/fetch", authMiddleware, fetchDepartmentsCtrl);
DepartmentRoutes.get("/fetch/:id", authMiddleware, fetchSingleDepartment);
DepartmentRoutes.put("/update/:id", authMiddleware, updateDepartmentCtrl);
DepartmentRoutes.delete("/fetch/:id", authMiddleware, deleteDepartmentCtrl);
module.exports = DepartmentRoutes;
