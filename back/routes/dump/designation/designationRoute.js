const express = require("express");

// const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createDesignationCtrl,
  fetchDesignationsCtrl,
  fetchSingleDesignation,
  updateDesignationCtrl,
  deleteDesignationCtrl,
} = require("../../controllers/designation/designationCtrl");

const DesignationRoutes = express.Router();
DesignationRoutes.post("/create", createDesignationCtrl);
DesignationRoutes.get("/fetch", fetchDesignationsCtrl);
DesignationRoutes.get("/fetch/:id", fetchSingleDesignation);
DesignationRoutes.put("/update/:id", updateDesignationCtrl);
DesignationRoutes.delete("/fetch/:id", deleteDesignationCtrl);
module.exports = DesignationRoutes;
