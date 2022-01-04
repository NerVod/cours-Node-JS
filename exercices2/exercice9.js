/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 192.168.104.15
   - Port : 80
   - Ressource : /formulaire.html
   - Query String : date=2015-09-01

  Donne l'URL : http://192.168.104.15:80/formulaire.html?date=2015-09-01
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel se trouvera un formulaire de saisie.

  Ce formulaire a pour attributs :
  - method="GET"
  - action="http://[adresse IP ou nom de domaine de votre serveur][:port de votre serveur]/traitement.html"

  Ce formulaire contient 4 champs :
  - titre avec pour attribut name="titre";
  - descriptif avec pour attribut name="descriptif";
  - date avec pour attribut name="date";
  - un bouton de soumission.

  Vérifiez que lorsque vous soumettez votre formulaire, votre navigateur
  Internet produit bien une requête HTTP dont l'URL est de la forme :
    http://[adresse IP ou nom de domaine de votre serveur][:port de votre serveur]/traitement.html?titre=&descriptif=&date=
**/

/**
  2.

  Créez un fichier HTML traitement.html dans lequel vous positionnerez trois
  chaînes de caractères facilement reconnaissables. Par exemple :
  - {{ titre }}
  - {{ description }}
  - {{ date }}

  Après avoir lu et obtenu le contenu du fichier traitement.html et avant de
  retourner la réponse HTTP, votre serveur HTTP doit remplacer dans le contenu
  du fichier les 3 chaînes de caractères par, respectivement, le titre, la
  description et la date provenants de la Query String contenue dans la requête HTTP.
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

//         ///////// formulaire //////////////////

//         const regexTitre = /{{ titre }}/;
//         let urlTitre = parsedUrl.searchParams.get('titre');

//         const regexDescription = /{{ description }}/;
//         let urlDescriptif= parsedUrl.searchParams.get('descriptif')
//         const regexDateFormulaire = /{{ date }}/;
//         let urlDate = parsedUrl.searchParams.get('date');
        

//         data = data.replace(regexTitre, urlTitre);
//         data = data.replace(regexDescription, urlDescriptif);
//         data = data.replace(regexDateFormulaire, urlDate);


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

// // sur fichier about.html : query string : ?name=Jeannerot&firstname=Benjamin

// server.listen(8080);
/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/




// reboot exercice sans méthode access

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
  let parsedUrl = new URL(reqUrl, `https://${req.rawHeaders[1]}`);
  parsedUrl;
  

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

    if(reqUrl.includes('traitement.html')){
      statusCode = 200;
      mimeType = 'text/html';
      filePath = path.join(__dirname + "/traitement.html")
    }
    
   
    
     
  
    // console.log("chemin du fichier demandé : ", filePath);
    
    let date = new Date();
    let dateFrance = date.toLocaleDateString("fr-FR");
    const urlParams = new URLSearchParams(reqUrl);
    // console.log(`url params `, urlParams)

  let nom = parsedUrl.searchParams.get("name");
  let prenom = parsedUrl.searchParams.get("firstname");
  let titre = parsedUrl.searchParams.get('titre');
  let description = parsedUrl.searchParams.get('descriptif');
  let dateForm = parsedUrl.searchParams.get('date');
  
  console.log(dateForm)

  console.log((`titre : `,titre, `description :`,description,`date formulaire `, dateForm))


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

      if(reqUrl.includes('/traitement.html')){
        file = file
        .toString()
        .replace("{{ titre }}", titre )
        .replace("{{ description }}", description )
        .replace("{{ date }}", dateForm )
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

// sur fichier about.html : query string : http://localhost:8080/about.html?name=Jeannerot&firstname=Benjamin
