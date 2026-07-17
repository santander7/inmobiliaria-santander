const multer = require('multer');

// Usamos almacenamiento en memoria porque enviaremos el buffer directo a Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
