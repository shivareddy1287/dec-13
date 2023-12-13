const express = require("express");

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createDesignationCtrl,
  fetchDesignationsCtrl,
  fetchSingleDesignation,
  updateDesignationCtrl,
  deleteDesignationCtrl,
} = require("../../controllers/designation/designationCtrl");

const DesignationRoutes = express.Router();
DesignationRoutes.post("/create", authMiddleware, createDesignationCtrl);
DesignationRoutes.get("/fetch", authMiddleware, fetchDesignationsCtrl);
DesignationRoutes.get("/fetch/:id", authMiddleware, fetchSingleDesignation);
DesignationRoutes.put("/update/:id", authMiddleware, updateDesignationCtrl);
DesignationRoutes.delete("/fetch/:id", authMiddleware, deleteDesignationCtrl);
module.exports = DesignationRoutes;
