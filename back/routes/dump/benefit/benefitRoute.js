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
benfitRoutes.post("/create", createBenefitCtrl);
benfitRoutes.get("/fetch", fetchBenefitsCtrl);
benfitRoutes.get("/fetch/:id", fetchSingleBenefit);
benfitRoutes.put("/update/:id", updateBenefitCtrl);
benfitRoutes.delete("/fetch/:id", deleteBenefitCtrl);
module.exports = benfitRoutes;
