// config/multerConfig.js
const multer = require('multer');
const path = require('path');

// Define o armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // exemplo: 172345987123.png
  }
});

const upload = multer({ storage });

module.exports = upload;
