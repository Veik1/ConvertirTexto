const fs = require("fs").promises;

async function crearArchivoTxt(nuevoContenido, nuevoTxtDir) {
  try {
    await fs.writeFile(nuevoTxtDir, nuevoContenido);
    console.log(`Se ha creado el archivo ${nuevoTxtDir}`);
  } catch (error) {
    throw new Error(`Error al crear el archivo .txt: ${error.message}`);
  }
}

module.exports = { crearArchivoTxt };