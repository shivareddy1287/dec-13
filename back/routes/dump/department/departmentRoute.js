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
DepartmentRoutes.post("/create", createDepartmentCtrl);
DepartmentRoutes.get("/fetch", fetchDepartmentsCtrl);
DepartmentRoutes.get("/fetch/:id", fetchSingleDepartment);
DepartmentRoutes.put("/update/:id", updateDepartmentCtrl);
DepartmentRoutes.delete("/fetch/:id", deleteDepartmentCtrl);
module.exports = DepartmentRoutes;
