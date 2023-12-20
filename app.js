const path = require("path");
const { crearArchivoTxt } = require("./crearTexto");
const { convertirAPDF } = require("./convertidor");
const { contarPalabras } = require("./contadorPalabras");
const fs = require("fs").promises;

const directorioArchivos = path.join(__dirname, "archivos");
const nombreArchivoTxt = "miArchivo.txt"; 
const nombreArchivoPDF = "miArchivo.pdf";

const nuevoContenido = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aenean ornare libero turpis, id varius libero aliquam eu. 
Fusce tincidunt velit ex, non convallis metus fringilla sed. 
Praesent semper malesuada dolor quis convallis. In sollicitudin cursus facilisis. 
Donec eros nisi, auctor ut vestibulum nec, dignissim nec velit. 
Praesent erat dui, pellentesque ac porta vitae, porttitor a ipsum. 
Aenean sagittis, massa id molestie porttitor, erat massa feugiat nisi, 
vel luctus odio arcu id risus. Pellentesque eget facilisis tortor. 
Cras tincidunt semper elit quis bibendum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

`;
const nuevoTxtDir = path.join(directorioArchivos, nombreArchivoTxt);

async function main() {
  try {
    // En caso de no existir el directorio, lo creamos con mkdir
    await fs.mkdir(directorioArchivos, { recursive: true });

    // Creación del archivo .txt
    await crearArchivoTxt(nuevoContenido, nuevoTxtDir);

    // Convertir archivo .txt a .pdf
    await convertirAPDF(directorioArchivos, nombreArchivoTxt, nombreArchivoPDF);

    // Ejecución del contador de palabras en el archivo .txt, usamos la función del archivo .js correspondiente
    const numPalabras = await contarPalabras(nuevoTxtDir);
    console.log(`Número de palabras en el archivo: ${numPalabras}`);

    console.log("Proceso completado exitosamente.");

  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
