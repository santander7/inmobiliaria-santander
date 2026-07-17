const fs = require('fs');
const path = require('path');

function splitVueFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, '.vue');

  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
  const scriptMatch = content.match(/<script setup>([\s\S]*?)<\/script>/);

  if (!templateMatch && !scriptMatch) return;

  let newVue = '';

  if (templateMatch) {
    fs.writeFileSync(path.join(dir, `${baseName}.html`), templateMatch[1].trim() + '\n');
    newVue += `<template src="./${baseName}.html"></template>\n`;
  }
  
  if (scriptMatch) {
    fs.writeFileSync(path.join(dir, `${baseName}.js`), scriptMatch[1].trim() + '\n');
    newVue += `<script setup src="./${baseName}.js"></script>\n`;
  }

  // Handle case where script might not exist but template does
  if (newVue !== '') {
    fs.writeFileSync(filePath, newVue);
    console.log(`Split ${filePath}`);
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
      splitVueFile(fullPath);
    }
  }
}

processDirectory('c:/Users/jhons/OneDrive/Escritorio/PROYECTO/frontend/src/views');
processDirectory('c:/Users/jhons/OneDrive/Escritorio/PROYECTO/frontend/src/layouts');
splitVueFile('c:/Users/jhons/OneDrive/Escritorio/PROYECTO/frontend/src/App.vue');

console.log('All files split successfully!');
