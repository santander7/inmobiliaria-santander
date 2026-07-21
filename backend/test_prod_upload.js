const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

async function testUpload() {
  const baseURL = 'https://inmobiliaria-santander.onrender.com/api';
  
  try {
    console.log("Registering test admin...");
    try {
      await axios.post(`${baseURL}/auth/register`, {
        nombre: 'Admin Test',
        correo: 'admin@inmobiliaria.com',
        telefono: '1234567890',
        password: 'password123'
      });
    } catch (e) {
      console.log("User might already exist (which is fine).");
    }

    console.log("Logging in...");
    const loginRes = await axios.post(`${baseURL}/auth/login`, {
      correo: 'admin@inmobiliaria.com',
      password: 'password123'
    });
    
    const token = loginRes.data.accessToken;
    console.log("Got token:", token.substring(0, 10) + "...");

    console.log("Creating dummy image...");
    const imgPath = path.join(__dirname, 'dummy.png');
    // tiny 1x1 png
    const base64Img = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    fs.writeFileSync(imgPath, Buffer.from(base64Img, 'base64'));

    console.log("Uploading image...");
    const form = new FormData();
    form.append('imagen', fs.createReadStream(imgPath));

    const uploadRes = await axios.post(`${baseURL}/upload`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Upload SUCCESS:", uploadRes.data);
  } catch (error) {
    if (error.response) {
      console.error("Upload FAILED:", error.response.status, error.response.data);
    } else {
      console.error("Upload FAILED with NO response:", error.message);
    }
  }
}

testUpload();
