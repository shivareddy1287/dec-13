const expressAsyncHandler = require("express-async-handler");
const AdressProof = require("../../model/hrLetters/hrLetters");
const fs = require("fs");
const UserDocuments = require("../../model/hrLetters/hrLetters");

const hrLettersPdfCtrl = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Your code logic here, you can access the uploaded file via req.file
    // console.log("File uploaded: " + req.file.originalname);
    const localPath = `uploads/pdf/${req?.file?.filename}`;
    console.log("localPath", localPath);

    const pdfContent = fs.readFileSync(localPath);

    const newAdressProof = new AdressProof({
      employeeId: req.body.employeeId, // Assuming you have an "employeeId" field in your request body
      adharPdf: pdfContent, // Store the file name in the database
    });

    // Save the document to MongoDB
    const savedAdressProof = await newAdressProof.save();

    res.json(savedAdressProof);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const addUserDocumentsCtrl = expressAsyncHandler(async (req, res) => {
  console.log("body", req.body.employeeId);
  console.log(req.body);
  console.log(req.file.buffer);

  try {
    const userDoc = await UserDocuments.create({
      employeeId: req.body.employeeId,
      user: req.body.employeeId,
      documentName: req.body.documentName,
      document: req.file.buffer,
    });
    res.json(userDoc);
  } catch (error) {
    res.json({ error: error.message });
  }
});

const fetchUsersDocumentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const userDocuments = await UserDocuments.find({});
    res.json(userDocuments);
  } catch (error) {
    res.json({ error: error.message });
  }
});

const fetchAdressProofsCtrl = expressAsyncHandler(async (req, res) => {
  console.log("fetch");
  try {
    const addressProofs = await AdressProof.find({});
    res.json(addressProofs);
  } catch (error) {
    res.json({ error: error.message });
  }
});

const deleteAddressProofCtrl = expressAsyncHandler(async (req, res) => {
  console.log("delete document");
  const id = req.params.id;
  try {
    const adressProof = await AdressProof.findByIdAndDelete(id);
    res.json(adressProof);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  hrLettersPdfCtrl,
  addUserDocumentsCtrl,
  fetchAdressProofsCtrl,
  fetchUsersDocumentsCtrl,
  deleteAddressProofCtrl,
};
