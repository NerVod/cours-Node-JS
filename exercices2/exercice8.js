/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 18.17.19.20
   - Port : 6767
   - Ressource : /bonjour.html
   - Query String : nom=Bruce&prenom=Wayne

  Donne l'URL : http://212.121.212.45:6767/bonjour.html?nom=Bruce&prenom=Wayne
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de
  caractères facilement reconnaissables. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier les
  deux chaînes de caractères par respectivement le nom et le prénom provenants du
  Query String.

  Pour extraire des données provenant d'une Query String contenu dans un URL,
  vous pouvez utiliser le module URL (WHATWG API) de Node JS. Ce module est documenté ici :
    https://nodejs.org/api/url.html
**/

/**
  2. Votre programme ne doit pas planter si la Query String n'est pas fournie ou
  que les informations demandées n'y figurent pas.
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


        
        const regexNom= /{{ nom }}/;
        let urlLastName = parsedUrl.searchParams.get('name');
        console.log(`nom de l'URL : `, urlLastName)

        const regexPrenom = /{{ prenom }}/;
        let urlFirstName = parsedUrl.searchParams.get('firstname');
        console.log(`prénom de l'URL : `, urlFirstName)

        if(urlLastName === null){
          urlLastName = "Nom";
        }
        if(urlFirstName === null){
          urlFirstName = "Prénom"
        }

        data = data.replace(regexNom, urlLastName);
        data = data.replace(regexPrenom, urlFirstName);

        data = data.replace(regexDate, dateRequete);

        data.toString();


        res.write(data);
        res.end();
      });
    }
  });
});

// sur fichier about.html : query string : ?name=Jeannerot&firstname=Benjamin

server.listen(8080);
/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
