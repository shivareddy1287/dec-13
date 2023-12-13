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
assetRoutes.post("/create", authMiddleware, authMiddleware, createAssetCtrl);
assetRoutes.get("/fetch", authMiddleware, fetchAssetsCtrl);
assetRoutes.get("/fetch/:id", authMiddleware, fetchSingleAsset);
assetRoutes.put("/update/:id", authMiddleware, updateAssetCtrl);
assetRoutes.delete("/fetch/:id", authMiddleware, deleteAssetCtrl);
module.exports = assetRoutes;
