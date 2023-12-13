const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/pdf"); // PDFs will be stored in the "uploads/pdf" folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage(); // This stores the file in memory as a buffer
const pdfUpload = multer({ storage: storage });

// const pdfUpload = multer({ storage });

module.exports = { pdfUpload };
