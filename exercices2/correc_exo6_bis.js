import { createServer } from "http";
import monModuleFileSystem from 'fs';
const httpServer = createServer();
import { readFile } from "fs";
// const process = require("process");
// const path = require("path");

// const contentType = "image/jpg"

// Déterminer le chemin du dossier de travail:
// const baseFolder = process.cwd();


httpServer.on("request", function (requeteHTTP, reponseHTTP) {
  console.log("j'ai trouvé une requête: ");
  const myURL = requeteHTTP.url;
  let filePath = '';
  let typeMime = "";
  let statusCode = 200;
  let statusMessage = "OK";
  
  console.log("myUrl : ", myURL);

  if (myURL.includes(".ico")) {
    console.log("ico détecté");
    typeMime = "image/jpeg";
    filePath = './images/react-redux.jpg';
  }

  if (myURL.includes(".css")) {
    console.log("css détecté");
    typeMime = "text/css";
    filePath = './style/style.css';
    console.log("j'ai changé le type MIME : ", typeMime);
  }

  if (myURL.includes(".js")) {
    console.log("js détecté");
    typeMime = "application/javascript";
  }

  if (myURL.includes(".jpeg")) {
    console.log("jpeg détecté");
    typeMime = "image/jpeg";
    filePath = './images/react-redux.jpg';
  }

  if (myURL.includes(".png")) {
    console.log("png détecté");
    typeMime = "image/png";
  }

  if (myURL.includes(".pdf")) {
    console.log("pdf détecté");
    typeMime = "application/pdf";
  }

  if (myURL.includes(".gif")) {
    console.log("gif détecté");
    typeMime = "image/gif";
  }

  if (myURL.includes(".html")) {
    console.log("html détecté");
    typeMime = "text/html; charset=utf-8";
    filePath = './public/index.html';
  }

  if (!monModuleFileSystem.existsSync(filePath)) {
    console.log("le chemin du fichier n'existe pas!...");
    filePath = baseFolder + "\\404.html";
    typeMime = "text/html; charset=utf-8";
  }

  console.log("typeMime : ", typeMime);

  readFile(filePath,  (err, data) => {
    if (err) {
      console.log("erreur trouvée :", err);
    }

    reponseHTTP.writeHead(statusCode, statusMessage, {
      "Content-Type": typeMime,
      "Content-Length": Buffer.byteLength(data),
    });

    reponseHTTP.write(data, function () {
      reponseHTTP.end();
    });
  });
});

httpServer.listen(5555);
