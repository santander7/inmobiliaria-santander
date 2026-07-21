const multer = require('multer');

// Usamos almacenamiento en memoria porque enviaremos el buffer directo a Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB límite
});

module.exports = upload;
