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

        ///////// formulaire //////////////////

        const regexTitre = /{{ titre }}/;
        let urlTitre = parsedUrl.searchParams.get('titre');

        const regexDescription = /{{ description }}/;
        let urlDescriptif= parsedUrl.searchParams.get('descriptif')
        const regexDateFormulaire = /{{ date }}/;
        let urlDate = parsedUrl.searchParams.get('date');
        

        data = data.replace(regexTitre, urlTitre);
        data = data.replace(regexDescription, urlDescriptif);
        data = data.replace(regexDateFormulaire, urlDate);


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
