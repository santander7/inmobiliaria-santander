const fs = require('fs');
const path = require('path');

function mergeVueFile(vuePath) {
  const dir = path.dirname(vuePath);
  const baseName = path.basename(vuePath, '.vue');
  const htmlPath = path.join(dir, `${baseName}.html`);
  const jsPath = path.join(dir, `${baseName}.js`);

  let newVue = '';
  let merged = false;
  
  if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8').trim();
    newVue += `<template>\n${htmlContent}\n</template>\n\n`;
    fs.unlinkSync(htmlPath);
    merged = true;
  }

  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8').trim();
    newVue += `<script setup>\n${jsContent}\n</script>\n`;
    fs.unlinkSync(jsPath);
    merged = true;
  }

  if (merged) {
    fs.writeFileSync(vuePath, newVue);
    console.log(`Merged ${vuePath}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.vue')) {
      mergeVueFile(fullPath);
    }
  }
}

processDirectory('c:/Users/jhons/OneDrive/Escritorio/PROYECTO/frontend/src/views');
processDirectory('c:/Users/jhons/OneDrive/Escritorio/PROYECTO/frontend/src/layouts');
mergeVueFile('c:/Users/jhons/OneDrive/Escritorio/PROYECTO/frontend/src/App.vue');

console.log('All files merged successfully!');
