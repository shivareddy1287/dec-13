const express = require("express");
const {
  hrLettersPdfCtrl,
  fetchAdressProofsCtrl,
  addUserDocumentsCtrl,
  fetchUsersDocumentsCtrl,
  deleteAddressProofCtrl,
} = require("../../controllers/hrLetters/hrLettersCtrl");
const { pdfUpload } = require("../../middlewares/uploads/pdfUpload");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const hrLettersRoute = express.Router();

hrLettersRoute.post("/", pdfUpload.single("adharPdf"), hrLettersPdfCtrl);
hrLettersRoute.post(
  "/userDocuments",
  pdfUpload.single("document"),
  addUserDocumentsCtrl
);
hrLettersRoute.get("/", authMiddleware, fetchAdressProofsCtrl);
hrLettersRoute.get("/userDocuments", authMiddleware, fetchUsersDocumentsCtrl);
hrLettersRoute.delete("/:id", authMiddleware, deleteAddressProofCtrl);

module.exports = hrLettersRoute;
