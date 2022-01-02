/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 212.121.212.45
   - Port : 8080
   - Ressource : /index.html

   Donne l'URL : http://212.121.212.45:8080/index.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez une chaîne de caractères
  facilement reconnaissable. Par exemple :
  - ##dateDuJour##

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier la
  chaîne de caractères par la date du jour.
**/

/**
  2. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de
  caractères facilement reconnaissables. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier les
  deux chaînes de caractères par respectivement votre nom et votre prénom.
**/
const http = require("http");
const fs = require("fs");
const server = http.createServer();
const path = require("path");
const process = require("process");
const { constants } = require("buffer");
const mime = require("mime");
const { brotliCompressSync } = require("zlib");

let dossierExecution = process.cwd().normalize();
let filePath = "";
let status;

let dateRequete = new Date();


///////////////////////////////////////////////////////////////
///// verif nom dossier des fichiers
const lesDossiers = function () {
  console.log("nom du fichier source : ", __filename);
  console.log("nom du dossier source :", __dirname);
  let dossierExecution = process.cwd().normalize();
  console.log(dossierExecution);
  return dossierExecution
};
lesDossiers();
//////////////////////////////////////////////////////////////


server.on("request", function (req, res) {
  const urlEnFormatBrut = req.url;
  const parsedUrl = new URL(urlEnFormatBrut, `http://${req.rawHeaders[1]}`);

  parsedUrl;
  console.log(parsedUrl);

  let suffixe = parsedUrl.pathname;

  let file = dossierExecution + suffixe;
  let file404 = dossierExecution + '\\404.html'
  

  

  fs.access(file, constants.F_OK | constants.W_OK, (err) => {
    if (err) {
      status = 404;
      filePath = file404;
      res.writeHead(status, {
        "Content-Type": "text/html; charset=utf8",
      });
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;
        res.write(data);
        res.end();
      });
    } else {
      status = 200;
      filePath = file;
      let mimeType = mime.getType(path.extname(filePath));
      // console.log(`filepath : `, filePath)
      // console.log(`mime type : `,mimeType);
      res.writeHead(status, {
        "Content-Type": mimeType,
        
      });
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;

        
        const regexDate = /##dateDuJour##/;
        const regexNom = /{{ nom }}/;
        const regexPrenom = /{{ prenom }}/;
        data = data.replace(regexDate, dateRequete);
        data = data.replace(regexNom, "Jeannerot");
        data = data.replace(regexPrenom, "Benjamin");
        data.toString();


        res.write(data);
        res.end();
      });
    }
  });
});

server.listen(8080);
/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
