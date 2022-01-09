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

  Modifiez le formulaire de l'exercice précédent en changeant :
  - method="GET" par method="POST"

  Vérifiez que lorsque vous soumettez votre formulaire, la Query String
  n'apparaît plus dans l'URL.
**/

/************************************************************************************************************
  Lorsqu'on spécifie method="POST" sur un formulaire, le navigateur Internet
  produit des requêtes HTTP pour lesquelles la Query String n'apparaît plus dans
  l'URL et donc dans l'en-tête de la requête HTTP, mais dans le corps de la
  requête HTTP. Illustration :

  Méthode GET :
                                        ______________
                                       |   En-têtes   |
                                       |   URL avec   |
                                       | Query String |
  Navigateur Internet --> Requête HTTP |   + autres   | --> Serveur HTTP
                                       |______________|
                                       |  Corps vide  |
                                       |______________|

  Méthode POST :
                                        ______________
                                       |   En-têtes   |
                                       |   URL avec   |
  Navigateur Internet --> Requête HTTP | autres infos | --> Serveur HTTP
                                       |______________|
                                       |    Corps     |
                                       | Query String |
                                       |______________|

  Donc coté serveur, si on souhaite récupérer la Query String, il faut lire le
  corps de la requête HTTP.

  Quel est l'intérêt ? Un URL est limité à 2048 caractères. Le corps de la
  requête n'a pas de limite de taille.
******************************************************************************************************************/

/**
  2. Créez un fichier HTML traitement.html dans lequel vous positionnerez trois
  chaînes de caractères facilement reconnaissables. Par exemple :
  - {{ titre }}
  - {{ description }}
  - {{ date }}

  Après avoir lu et obtenu le contenu du fichier traitement.html et avant de
  retourner la réponse HTTP, votre serveur HTTP doit remplacer dans le contenu
  du fichier les 3 chaînes de caractères par, respectivement, le titre, la
  description et la date provenants de la Query String contenue dans le CORPS de la
  requête HTTP.

  Pour récupérer le contenu du corps de la requête HTTP :

  Les objets de type http.IncomingMessage qui représentent une requête HTTP héritent
  d'un objet de type ReadableStream documenté ici :
    https://nodejs.org/api/stream.html#stream_class_stream_readable.
  Et les objets de type ReadableStream héritent d'un objet de type EventEmitter.

  Un objet de type http.IncomingMessage possède donc les évènements 'data' et
  'end' de l'objet ReadableStream.
  - 'data' : est l'évènement qui se déclenche une ou plusieurs fois au fur et à
    mesure que le serveur HTTP télécharge le corps de la requête envoyée par
    le navigateur Internet.
  - 'end' : est l'évènement qui se déclenche quand serveur HTTP à reçu la
    totalité du corps de la requête.

  Pour récupérer la Query String on doit donc utiliser l'évènement 'data' pour
  reconstruire progressivement la Query String et, à la fin du téléchargement de
  la Query String, déclencher les instructions souhaitées.

  Exemple :

  ...
  let queryString = ``; //variable dans laquelle sera stockée progressivement la query string

  requeteHTTP.on('data', function(morceauDeQueryString){
    // Cette fonction est exécutée par Node JS à plusieurs reprises
    // avec, à chaque fois, en paramètre une partie de la Query String
    // jusqu'à ce que la totalité des morceaux de cette dernière aient
    // été téléchargés.
    queryString += morceauDeQueryString;
  });

  requeteHTTP.on('end', function(){
    //Cette fonction est exécutée par Node JS une seule fois quand
    //le corps de la requête à été totalement téléchargé.
    queryString; //Ici on peut considérer que la variable queryString contient la totalité du corps de la requête.

  });

  ...

  Pour manipuler facilement la query string, on utilisera le module URLSearchParams de Node JS documenté ici :
    https://nodejs.org/api/url.html#class-urlsearchparams
  Elle permet, à partir d'une URL, de créer un objet contenant les paramètres de query string.
**/

// function getPromisePage(path) {
//   let pageToGet = '';
//   fsPromises.readFile(
//     path,
//     'utf-8',
//   )
//   .then(data => {
//     pageToGet = data.toString();
//     console.log('fichier reçu :' ,pageToGet)

//     return pageToGet
//   })
//   .catch(error => {
//     throw new Error(error)
//   })
// };

// getPromisePage('./home.html');


// const { error } = require("console");
// const http = require("http");
// const server = http.createServer();
// const fs = require("fs");
// // let status = "";
// // let mimeType = "text/html";
// const process = require("process");
// const path = require('path');
// const { homedir } = require("os");
// const dossierExecution = process.cwd().normalize();
// // let filePath = "";

// server.on("request", (req, res) => {
//   console.log("requête reçue : ", req.url);
  

//   const reqUrl = req.url;
//   let parsedUrl = new URL(reqUrl, `https://${req.rawHeaders[1]}`);
//   parsedUrl;
//   console.log( `la req.rawheaders`, req.rawHeaders[1])
  

//   let filePath = "";
//   let mimeType = "text/plain";
//   let statusCode;

//   switch (reqUrl) {
//     case "/home.html":
//       (statusCode = 200), (filePath = "./home.html");
//       mimeType = "text/html";
//       break;
//     case "/homepost.html":
//       (statusCode = 200), (filePath = "./homepost.html");
//       mimeType = "text/html";
//       break;

//     case "/about.html":
//       (statusCode = 200), (filePath = "./about.html");
//       mimeType = "text/html";
//       break;

//     default:
//       statusCode = 404;
//       filePath = "./404.html";
//       mimeType = "text/html";
//       break;
//   }

  

    
    
//     if (reqUrl.includes('.css')) {
//       statusCode = 200;
//       mimeType = 'text/css';
//       filePath = './style.css';
//     }
//     if(reqUrl.includes('.jpg')) {
//       statusCode = 200;
//       mimeType = 'image/jpeg';
//       filePath = path.join(__dirname + reqUrl);
//     }
//     if(reqUrl.includes('.gif')) {
//       statusCode = 200;
//       mimeType = 'image/gif';
//       filePath = path.join(__dirname + reqUrl);
//     }
    
//     if(reqUrl.includes('png')) {
//       statusCode = 200;
//       mimeType = 'image/png';
//       filePath = path.join(__dirname + reqUrl)
//     }
    
//     if(reqUrl.includes('pdf')){
//       statusCode = 200;
//       mimeType = 'application/pdf';
//       filePath = path.join(__dirname + reqUrl)
//     }

//     if(reqUrl.includes('home.html')){
//       statusCode = 200;
//       mimeType = 'text/html';
//       filePath = path.join(__dirname + "/home.html")
//     }

//     if(reqUrl.includes('about.html')){
//       statusCode = 200;
//       mimeType = 'text/html';
//       filePath = path.join(__dirname + "/about.html")
//     }

//     if(reqUrl.includes('traitement.html')){
//       statusCode = 200;
//       mimeType = 'text/html';
//       filePath = path.join(__dirname + "/traitement.html")
//     }
    
//   //////////////////////////////////////////////////////////////////////////////////////// 
//   //////////////////////////////////////////////////////////////////////////////////////// 
//     // traitement de l'URL dans le corps de la requête
// let titrepost="";
// let descriptifpost="";
// let datepost="";



//   let queryString =``;
//   req.on('data', function(morceauDeQueryString) {
//     queryString += morceauDeQueryString;
//   })
//   req.on('end', function() {
//     queryString;
//     console.log(`la queryString :`, queryString)
    
//     let params = new URLSearchParams(queryString);
//     titrepost = params.get('titre');
//     descriptifpost = params.get('descriptif');
//     datepost = params.get('date');
    
//     console.log( `titre query string corps `, titrepost)
//     console.log( `descriptif query string corps `, descriptifpost)
//     console.log( `date query string corps `, datepost);

     
//   })
//   console.log( ` dehors titre query string corps `, titrepost)
//     console.log( ` dehors descriptif query string corps `, descriptifpost)
//     console.log( ` dehors date query string corps `, datepost);
     
//   ////////////////////////////////////////////////////////////////////////////////////////
//   ////////////////////////////////////////////////////////////////////////////////////////

//     // console.log("chemin du fichier demandé : ", filePath);
    
//     let date = new Date();
//     let dateFrance = date.toLocaleDateString("fr-FR");
//     const urlParams = new URLSearchParams(reqUrl);
//     // console.log(`url params `, urlParams)

//   let nom = parsedUrl.searchParams.get("name");
//   let prenom = parsedUrl.searchParams.get("firstname");
//   let titre = parsedUrl.searchParams.get('titre');
//   let description = parsedUrl.searchParams.get('descriptif');
//   let dateForm = parsedUrl.searchParams.get('date');
  
//   console.log(dateForm)

//   console.log((`titre : `,titre, `description :`,description,`date formulaire `, dateForm))


//   // console.log(`nom et prénom de url `, nom, prenom)
//   if(nom === null) {
//     nom = "Nom"
//   };
//   if(prenom === null) {
//     prenom = "prénom"
//   }

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       throw new Error(err);
//     } else {
//       let file = data;
//       // console.log("file ", file);

//       if (reqUrl.includes(".html")) {
//         file = file.toString().replace("##dateDuJour##", dateFrance);
//         // console.log("file pour home.html :",file);
//       }

//       if (reqUrl.includes("/about.html")) {
//         file = file
//           .toString()
//           .replace("{{ nom }}", nom)
//           .replace("{{ prenom }}", prenom);
//       }

//       if(reqUrl.includes('/traitement.html')){
//         file = file
//         .toString()
//         .replace("{{ titre }}", titre)
//         .replace("{{ description }}", description )
//         .replace("{{ date }}", dateForm )
//       }

//       res.writeHead(statusCode, {
//         "Content-Type": mimeType,
//         "Content-Length": Buffer.byteLength(file),
//       });
//       res.write(file);
//       res.end();
//     }
//   });
// });

// server.listen(8080);

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/

const { Console } = require("console");
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  req;
  res;

  let method = req.method;

  if (method === GET) {
    const reqUrl = req.url;
    let parsedUrl = new URL(reqUrl, `https://${req.rawHeaders[1]}`);
    parsedUrl;
    console.log(`la req.rawheaders`, req.rawHeaders[1]);

    let filePath = "";
    let mimeType = "text/plain";
    let statusCode;

    switch (reqUrl) {
      case "/home.html":
        (statusCode = 200), (filePath = "./home.html");
        mimeType = "text/html";
        break;
      case "/homepost.html":
        (statusCode = 200), (filePath = "./homepost.html");
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

    if (reqUrl.includes(".css")) {
      statusCode = 200;
      mimeType = "text/css";
      filePath = "./style.css";
    }
    if (reqUrl.includes(".jpg")) {
      statusCode = 200;
      mimeType = "image/jpeg";
      filePath = path.join(__dirname + reqUrl);
    }
    if (reqUrl.includes(".gif")) {
      statusCode = 200;
      mimeType = "image/gif";
      filePath = path.join(__dirname + reqUrl);
    }

    if (reqUrl.includes("png")) {
      statusCode = 200;
      mimeType = "image/png";
      filePath = path.join(__dirname + reqUrl);
    }

    if (reqUrl.includes("pdf")) {
      statusCode = 200;
      mimeType = "application/pdf";
      filePath = path.join(__dirname + reqUrl);
    }

    if (reqUrl.includes("home.html")) {
      statusCode = 200;
      mimeType = "text/html";
      filePath = path.join(__dirname + "/home.html");
    }

    if (reqUrl.includes("about.html")) {
      statusCode = 200;
      mimeType = "text/html";
      filePath = path.join(__dirname + "/about.html");
    }

    if (reqUrl.includes("traitement.html")) {
      statusCode = 200;
      mimeType = "text/html";
      filePath = path.join(__dirname + "/traitement.html");
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    // traitement de l'URL dans le corps de la requête
    let titrepost = "";
    let descriptifpost = "";
    let datepost = "";

    let queryString = ``;
    req.on("data", function (morceauDeQueryString) {
      queryString += morceauDeQueryString;
    });
    req.on("end", function () {
      queryString;
      console.log(`la queryString :`, queryString);

      let params = new URLSearchParams(queryString);
      titrepost = params.get("titre");
      descriptifpost = params.get("descriptif");
      datepost = params.get("date");

      console.log(`titre query string corps `, titrepost);
      console.log(`descriptif query string corps `, descriptifpost);
      console.log(`date query string corps `, datepost);
    });
    console.log(` dehors titre query string corps `, titrepost);
    console.log(` dehors descriptif query string corps `, descriptifpost);
    console.log(` dehors date query string corps `, datepost);

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // console.log("chemin du fichier demandé : ", filePath);

    let date = new Date();
    let dateFrance = date.toLocaleDateString("fr-FR");
    const urlParams = new URLSearchParams(reqUrl);
    // console.log(`url params `, urlParams)

    let nom = parsedUrl.searchParams.get("name");
    let prenom = parsedUrl.searchParams.get("firstname");
    let titre = parsedUrl.searchParams.get("titre");
    let description = parsedUrl.searchParams.get("descriptif");
    let dateForm = parsedUrl.searchParams.get("date");

    console.log(dateForm);

    console.log(
      (`titre : `,
      titre,
      `description :`,
      description,
      `date formulaire `,
      dateForm)
    );

    // console.log(`nom et prénom de url `, nom, prenom)
    if (nom === null) {
      nom = "Nom";
    }
    if (prenom === null) {
      prenom = "prénom";
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw new Error(err);
      } else {
        let file = data;
        // console.log("file ", file);

        if (reqUrl.includes(".html")) {
          file = file.toString().replace("##dateDuJour##", dateFrance);
          // console.log("file pour home.html :",file);
        }

        if (reqUrl.includes("/about.html")) {
          file = file
            .toString()
            .replace("{{ nom }}", nom)
            .replace("{{ prenom }}", prenom);
        }

        if (reqUrl.includes("/traitement.html")) {
          file = file
            .toString()
            .replace("{{ titre }}", titre)
            .replace("{{ description }}", description)
            .replace("{{ date }}", dateForm);
        }

        res.writeHead(statusCode, {
          "Content-Type": mimeType,
          "Content-Length": Buffer.byteLength(file),
        });
        res.write(file);
        res.end();
      }
    });

    if (method === POST) {
      let donnees = "";
      req.on("data", function (morceauDeQueryString) {
        donnees += morceauDeQueryString;
      });
      req.on("end", function () {
        donnees;
        doneesEnJSON = new URLSearchParams(req.body);

        let titrePost = doneesEnJSON.get("titre");
        let descriptionPost = doneesEnJSON.get("descriptif");
        let dateFormPost = doneesEnJSON.get("date");

        fs.readFile("./traitement.html", (err, data) => {
          if (err) {
            Console.log("erreur de chargement des données du formulaire");
          } else {
            let file = data
              .toString()
              .replace("{{ titre }}", titrePost)
              .replace("{{ description }}", descriptionPost)
              .replace("{{ date }}", dateFormPost);
          }
          res.writeHead(statusCode, {
            "Content-Type": mimeType,
            "Content-Length": Buffer.byteLength(file),
          });
          res.write(file);
          res.end();
        });
      });
    }
  }
});
server.listen(8080);