const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'cwghjwia',
  api_key: '533693579592636',
  api_secret: 'luXqa81N1iDbbAB05fT-F_6DJKM'
});

// A tiny 1x1 pixel transparent PNG in base64
const tinyImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

cloudinary.uploader.upload(tinyImage, { folder: "inmobiliaria_putumayo_proyectos" })
  .then(result => {
    console.log("Cloudinary Upload SUCCESS:", result.secure_url);
  })
  .catch(err => {
    console.error("Cloudinary Upload ERROR:", err.message);
  });
