const fs = require('fs');
const path = require('path');

async function testUpload() {
  const baseURL = 'https://inmobiliaria-santander.onrender.com/api';
  
  try {
    console.log("Logging in...");
    const loginRes = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correo: 'admin@inmobiliaria.com',
        password: 'password123' // assuming this is a valid user or we can just bypass if it's correct
      })
    });
    
    if (!loginRes.ok) {
        console.log("Login failed", await loginRes.text());
        // register instead
        const reg = await fetch(`${baseURL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: 'Admin Test',
            correo: 'admin2@inmobiliaria.com',
            telefono: '1234567890',
            password: 'password123'
          })
        });
        const loginRes2 = await fetch(`${baseURL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            correo: 'admin2@inmobiliaria.com',
            password: 'password123'
          })
        });
        if(!loginRes2.ok) return console.log("Still failed login");
        var token = (await loginRes2.json()).accessToken;
    } else {
        var token = (await loginRes.json()).accessToken;
    }

    console.log("Got token:", token.substring(0, 10) + "...");

    console.log("Creating dummy image...");
    const imgPath = path.join(__dirname, 'dummy.png');
    const base64Img = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    fs.writeFileSync(imgPath, Buffer.from(base64Img, 'base64'));

    console.log("Uploading image...");
    
    const { Blob } = require('buffer');
    const fileBuffer = fs.readFileSync(imgPath);
    const blob = new Blob([fileBuffer], { type: 'image/png' });
    
    const form = new FormData();
    form.append('imagen', blob, 'dummy.png');

    const uploadRes = await fetch(`${baseURL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    });

    if (uploadRes.ok) {
      console.log("Upload SUCCESS:", await uploadRes.json());
    } else {
      console.log("Upload FAILED:", uploadRes.status, await uploadRes.text());
    }
  } catch (error) {
    console.error("Upload FAILED with exception:", error);
  }
}

testUpload();
