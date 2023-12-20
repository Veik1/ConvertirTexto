// convertidor.js

const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

async function convertirAPDF(directorio, nombreTxt, nombrePDF) {
  const txtFilePath = path.resolve(directorio, nombreTxt);
  const pdfFilePath = path.resolve(directorio, nombrePDF);

  // Verificación de la existencia del directorio
  await fs.promises.mkdir(directorio, { recursive: true });

  const doc = new PDFDocument();

  try {
    // Creación del flujo de escritura
    const writeStream = fs.createWriteStream(pdfFilePath);

    // Conexión del PDF con el flujo de escritura
    doc.pipe(writeStream);

    // Leer el contenido del archivo de texto
    const data = await fs.promises.readFile(txtFilePath, "utf8");

    // Función para agregar el contenido del archivo .txt al PDF
    doc.text(data);

    // Cierre del documento PDF
    doc.end();

    // Espera del cierre del flujo de escritura
    await new Promise((resolve) => {
      writeStream.on("finish", resolve);
    });

    console.log(`Archivo ${nombrePDF} creado exitosamente en ${directorio}`);
  } catch (error) {
    // En caso de error, se cerrará el flujo del documento PDF
    doc.end();

    throw new Error(
      `Error al convertir el archivo .txt a .pdf: ${error.message}`
    );
  }
}

module.exports = { convertirAPDF };
