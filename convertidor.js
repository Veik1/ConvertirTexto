// convertidor.js

const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");

/* Se utilizarán funciones asincronas dado que se realizarán operaciones de lectura y escritura de archivos,
y que el código se ejecute de manera secuencial, además de tener acceso a las funciones await y
promises, la primera se utiliza para poner en pausa la ejecuciòn de una funciòn async, hasta que 
la promesa se resuelva o no, y esta ultima se usa para la representación de operaciones asíncronas 
y manejar los resultados o fallos */

async function convertirAPDF(directorio, nombreTxt, nombrePDF) {
  const txtFilePath = path.resolve(directorio, nombreTxt);
  const pdfFilePath = path.resolve(directorio, nombrePDF);

  // Verificación de la existencia del directorio, en caso de no existir, se crearà este mismo de manera recursiva
  await fs.promises.mkdir(directorio, { recursive: true });

  // Creaciòn de instancia, permitido gracias al modulo de pdfkit, basicamente representarìa un documento .pdf
  const doc = new PDFDocument();

  try {
    // Creación del flujo de escritura
    const writeStream = fs.createWriteStream(pdfFilePath);

    // Conexión del PDF con el flujo de escritura, todo el contenido añadido al texto, serà enviado al documento .pdf
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
