const express = require("express");

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createBenefitCtrl,
  fetchBenefitsCtrl,
  fetchSingleBenefit,
  updateBenefitCtrl,
  deleteBenefitCtrl,
} = require("../../controllers/benefit/benefitCtrl");

const benfitRoutes = express.Router();
benfitRoutes.post("/create", authMiddleware, createBenefitCtrl);
benfitRoutes.get("/fetch", authMiddleware, fetchBenefitsCtrl);
benfitRoutes.get("/fetch/:id", authMiddleware, fetchSingleBenefit);
benfitRoutes.put("/update/:id", authMiddleware, updateBenefitCtrl);
benfitRoutes.delete("/fetch/:id", authMiddleware, deleteBenefitCtrl);
module.exports = benfitRoutes;
