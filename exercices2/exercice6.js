/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.2.1.0
   - Port : 4321
   - Ressource : /ville/paris.html

   Donne l'URL : http://10.2.1.0:4321/ville/paris.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Votre serveur HTTP doit gérer différents Mime Types. Vous devez faire en sorte
  que le Mime Type soit conforme à l'extension obtenue à partir de la ressource
  dans l'URL.

  Par exemple :
  - Si l'URL est http://10.2.1.0:4321/photo.jpeg (et que le fichier photo.jpeg
    existe)
  - Alors l'en-tête de la réponse HTTP doit contenir Content-Type : 'image/jpeg'

  Vous devez gérer les Mime Types des formats de fichier suivant :
    css, js, jpeg, png, pdf, gif.

  La liste des Mime Types autorisés est disponible ici :
    http://www.iana.org/assignments/media-types/media-types.xhtml
**/

/**
  2. Utiliser votre serveur HTTP pour "servir" votre projet Front End (sur le
    réseau local).

  Pensez à utiliser l'onglet réseau des outils de développement de votre
  navigateur Internet pour vérifier que vous arrivez bien à télécharger toutes
  les ressources exigées par votre projet.

  Ajoutez la gestion des Mime Types manquants si nécessaire...
**/

///// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
////// installation package :  npm install mime
/// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const http = require("http");
const fs = require("fs");
const server = http.createServer();
const path = require("path");
const process = require("process");
const { constants } = require("buffer");
const mime = require("mime");


let dossierExecution = process.cwd().normalize();
let filePath = "";
let status;

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
///////////////////////////////////////////////////////////////////

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
      console.log(`filepath : `, filePath)
      console.log(`mime type : `,mimeType);
      res.writeHead(status, {
        "Content-Type": mimeType,
        
      });
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;
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
