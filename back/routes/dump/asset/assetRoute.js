const express = require("express");
const {
  createAssetCtrl,
  fetchAssetsCtrl,
  fetchSingleAsset,
  updateAssetCtrl,
  deleteAssetCtrl,
} = require("../../controllers/asset/assetCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const assetRoutes = express.Router();
assetRoutes.post("/create", createAssetCtrl);
assetRoutes.get("/fetch", fetchAssetsCtrl);
assetRoutes.get("/fetch/:id", fetchSingleAsset);
assetRoutes.put("/update/:id", updateAssetCtrl);
assetRoutes.delete("/fetch/:id", deleteAssetCtrl);
module.exports = assetRoutes;
