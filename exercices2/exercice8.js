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
// const http = require("http");
// const fs = require("fs");
// const server = http.createServer();
// const path = require("path");
// const process = require("process");
// const { constants } = require("buffer");
// const mime = require("mime");
// const { brotliCompressSync } = require("zlib");

// let dossierExecution = process.cwd().normalize();
// let filePath = "";
// let status;

// let dateRequete = new Date();


// ///////////////////////////////////////////////////////////////
// ///// verif nom dossier des fichiers
// const lesDossiers = function () {
//   console.log("nom du fichier source : ", __filename);
//   console.log("nom du dossier source :", __dirname);
//   let dossierExecution = process.cwd().normalize();
//   console.log(dossierExecution);
//   return dossierExecution
// };
// lesDossiers();
// //////////////////////////////////////////////////////////////


// server.on("request", function (req, res) {
//   const urlEnFormatBrut = req.url;
//   const parsedUrl = new URL(urlEnFormatBrut, `http://${req.rawHeaders[1]}`);

//   parsedUrl;
//   console.log(parsedUrl);

//   let suffixe = parsedUrl.pathname;

//   let file = dossierExecution + suffixe;
//   let file404 = dossierExecution + '\\404.html'
  

  

//   fs.access(file, constants.F_OK | constants.W_OK, (err) => {
//     if (err) {
//       status = 404;
//       filePath = file404;
//       res.writeHead(status, {
//         "Content-Type": "text/html; charset=utf8",
//       });
//       fs.readFile(filePath, "utf8", (err, data) => {
//         if (err) throw err;
//         res.write(data);
//         res.end();
//       });
//     } else {
//       status = 200;
//       filePath = file;
//       let mimeType = mime.getType(path.extname(filePath));
//       // console.log(`filepath : `, filePath)
//       // console.log(`mime type : `,mimeType);
//       res.writeHead(status, {
//         "Content-Type": mimeType,
        
//       });
//       fs.readFile(filePath, "utf8", (err, data) => {
//         if (err) throw err;


//         const regexDate = /##dateDuJour##/;


        
//         const regexNom= /{{ nom }}/;
//         let urlLastName = parsedUrl.searchParams.get('name');
//         console.log(`nom de l'URL : `, urlLastName)

//         const regexPrenom = /{{ prenom }}/;
//         let urlFirstName = parsedUrl.searchParams.get('firstname');
//         console.log(`prénom de l'URL : `, urlFirstName)

//         if(urlLastName === null){
//           urlLastName = "Nom";
//         }
//         if(urlFirstName === null){
//           urlFirstName = "Prénom"
//         }

//         data = data.replace(regexNom, urlLastName);
//         data = data.replace(regexPrenom, urlFirstName);

//         data = data.replace(regexDate, dateRequete);

//         data.toString();


//         res.write(data);
//         res.end();
//       });
//     }
//   });
// });

// // sur fichier about.html : query string : http://localhost:8080/about.html?&name=Jeannerot&firstname=Benjamin

// server.listen(8080);
/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/

/// reboot exercice sans méthode dépréciée Access


const { error } = require("console");
const http = require("http");
const server = http.createServer();
const fs = require("fs");
// let status = "";
// let mimeType = "text/html";
const process = require("process");
const path = require('path');
const { homedir } = require("os");
const dossierExecution = process.cwd().normalize();
// let filePath = "";

server.on("request", (req, res) => {
  console.log("requête reçue : ", req.url);
  

  const reqUrl = req.url;
  

  let filePath = "";
  let mimeType = "text/plain";
  let statusCode;

  switch (reqUrl) {
    case "/home.html":
      (statusCode = 200), (filePath = "./home.html");
      mimeType = "text/html";
      break;

    case "/about.html":
      (statusCode = 200), (filePath = "./about.html");
      mimeType = "text/html";
      break;

    default:
      statusCode = 404;
      filePath = "./404.html";
      mimeType = "text/html";
      break;
  }

  

    
    
    if (reqUrl.includes('.css')) {
      statusCode = 200;
      mimeType = 'text/css';
      filePath = './style.css';
    }
    if(reqUrl.includes('.jpg')) {
      statusCode = 200;
      mimeType = 'image/jpeg';
      filePath = path.join(__dirname + reqUrl);
    }
    if(reqUrl.includes('.gif')) {
      statusCode = 200;
      mimeType = 'image/gif';
      filePath = path.join(__dirname + reqUrl);
    }
    
    if(reqUrl.includes('png')) {
      statusCode = 200;
      mimeType = 'image/png';
      filePath = path.join(__dirname + reqUrl)
    }
    
    if(reqUrl.includes('pdf')){
      statusCode = 200;
      mimeType = 'application/pdf';
      filePath = path.join(__dirname + reqUrl)
    }

    if(reqUrl.includes('home.html')){
      statusCode = 200;
      mimeType = 'text/html';
      filePath = path.join(__dirname + "/home.html")
    }

    if(reqUrl.includes('about.html')){
      statusCode = 200;
      mimeType = 'text/html';
      filePath = path.join(__dirname + "/about.html")
    }
    
   
    
     
  
    // console.log("chemin du fichier demandé : ", filePath);
    
    let date = new Date();
    let dateFrance = date.toLocaleDateString("fr-FR");
    const urlParams = new URLSearchParams(reqUrl);
    // console.log(`url params `, urlParams)

  let nom = urlParams.get("name");
  let prenom = urlParams.get("firstname");
  // console.log(`nom et prénom de url `, nom, prenom)
  if(nom === null) {
    nom = "Nom"
  };
  if(prenom === null) {
    prenom = "prénom"
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw new Error(err);
    } else {
      let file = data;
      // console.log("file ", file);

      if (reqUrl.includes("/home.html")) {
        file = file.toString().replace("##dateDuJour##", dateFrance);
        // console.log("file pour home.html :",file);
      }

      if (reqUrl.includes("/about.html")) {
        file = file
          .toString()
          .replace("{{ nom }}", nom)
          .replace("{{ prenom }}", prenom);
      }

      res.writeHead(statusCode, {
        "Content-Type": mimeType,
        "Content-Length": Buffer.byteLength(file),
      });
      res.write(file);
      res.end();
    }
  });
});

server.listen(8080);

// sur fichier about.html : query string : http://localhost:8080/about.html?&name=Jeannerot&firstname=Benjamin