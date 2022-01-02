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
  const method = req.method;
  console.log(`la méthode est en : `, method);
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
        
        const regexDescription = /{{ description }}/;
        const regexDateFormulaire = /{{ date }}/;
        
        if(method === "get") {

          let urlTitre = parsedUrl.searchParams.get('titre');
          
          let urlDescriptif= parsedUrl.searchParams.get('descriptif')
          
          let urlDate = parsedUrl.searchParams.get('date');

          data = data.replace(regexTitre, urlTitre);
          data = data.replace(regexDescription, urlDescriptif);
          data = data.replace(regexDateFormulaire, urlDate);
          
          
          data = data.replace(regexNom, urlLastName);
          data = data.replace(regexPrenom, urlFirstName);
          
          data = data.replace(regexDate, dateRequete);
          
          data = data.toString();
          return data;
        }

        let donnees = "";
        if( method === "post"){

          req.on("data", (morceauDeDonnee) => {
            donnees += morceauDeDonnee;
            donnees = donnees.toString();
            return donnees
          })
          req.on('end', function(){
            donnees;
            console.log(`les données : `, donnees)
            return donnees;
          })

          let queryStringMethodPost = new URLSearchParams(donnees);
          console.log(`la query string de post :` , queryStringMethodPost)

          let urlTitrePost = queryStringMethodPost.get('titre');
          let urlDescriptifPost = queryStringMethodPost.get('descriptif');
          let urlDatePost = queryStringMethodPost.get('date')

          data = data.replace(regexTitre, urlTitrePost);
          data = data.replace(regexDescription, urlDescriptifPost);
          data = data.replace(regexDateFormulaire, urlDatePost);

          data = data.toString();
          
          return data;

        }
          

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
