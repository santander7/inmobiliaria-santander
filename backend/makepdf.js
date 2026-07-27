const markdownpdf = require("markdown-pdf");
const fs = require("fs");

const mdPath = "C:\\Users\\jhons\\OneDrive\\Escritorio\\Documento_Proyecto_Grado.md";
const pdfPath = "C:\\Users\\jhons\\OneDrive\\Escritorio\\Documento_Proyecto_Grado.pdf";

markdownpdf()
  .from(mdPath)
  .to(pdfPath, function () {
    console.log("PDF created successfully!");
  });
