const fs = require("fs").promises;

async function contarPalabras(archivoPath) {
  try {
    const contenido = await fs.readFile(archivoPath, "utf8");
    const palabras = contenido.match(/\b\w+\b/g) || [];
    return palabras.length;
  } catch (error) {
    throw new Error(`Error al contar las palabras: ${error.message}`);
  }
}

module.exports = { contarPalabras };
