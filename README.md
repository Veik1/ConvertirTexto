# ConvertirTexto
Aplicación para crear texto, convertirlo a .pdf y realizar un conteo de palabras

Como ejecutarlo?
En la terminal, se debe ejecutar el comando **node app.js** estando dentro del directorio donde se encuentra el código descargado
En caso de no ejecutarse el còdigo por la falta de los módulos que se utilizarán, al poseer los archivos .json, solo se ejecuta el comando **npm install**

Los codigos poseen estas consignas

- **Creación de archivo .txt**

```
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

```

El codigo en cuestión representa una ejecución de una función asíncrona, que intenta crear un archivo y el contenido de este mismo, el código será llamado durante la ejecución de app.js

```
Parte del còdigo que interactuarà con crearTexto.js

const directorioArchivos = path.join(__dirname, "archivos");
const nombreArchivoTxt = "miArchivo.txt"; 

const nuevoContenido = `
<Contenido del texto>
`;

const nuevoTxtDir = path.join(directorioArchivos, nombreArchivoTxt);

async function main() {
  try {
    // En caso de no existir el directorio, lo creamos con mkdir
    await fs.mkdir(directorioArchivos, { recursive: true });

    // Creación del archivo .txt
    await crearArchivoTxt(nuevoContenido, nuevoTxtDir);

  <Resto del código...>

  } catch (error) {
    console.error("Error:", error.message);
  }
}

```

- **Convertidor de TXT a PDF**

Crear una aplicación en Node.js que permita convertir archivos de texto plano (TXT) a
archivos PDF, utilizando Node.JS y las bibliotecas que sean necesarias. La aplicación debe
aceptar una ruta de un archivo TXT como entrada y generar un archivo PDF con el mismo
contenido en la misma ubicación. Todo debe realizarse sobre Linux y ejecutarse en la
consola.


- **Contador de palabras**

Crear una aplicación en Node.JS que permita contar la cantidad de palabras en un archivo de
texto especificado por el usuario. La aplicación debe aceptar la ruta del archivo de texto
como argumento de línea de comando y mostrar el resultado en la consola de Linux.

El texto especificado serà el creado, la ùnica diferencia con lo que requiere la consigna, es el hecho de que la funciòn entra en ejecución una vez creado el texto, y convertido a .pdf.
