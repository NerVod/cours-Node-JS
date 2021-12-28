/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.30.20.30
   - Port : 8899
   - Ressource : /index

  Donne l'URL : http://10.30.20.30:8899/index
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide si et seulement si l'URL contenu dans la
  requête HTTP contient
    /index.

  Votre objet de type http.IncomingMessage contient une propriété .url vous
  permettant d'obtenir des informations relatives à l'URL employé pour effectuer
  la requête HTTP.
**/



// const http = require('http');
// const httpServer = http.createServer();
// const port = 8080;
// let status = 200;

// httpServer.on("request" , function( requeteHTTP , reponseHTTP ){
 
//  const urlEnFormatBrut = requeteHTTP.url;
//  const parsedUrl = new URL(urlEnFormatBrut, `http://${requeteHTTP.rawHeaders[1]}`);

//  parsedUrl;

//  const suffixe = parsedUrl.pathname;

//  let corps;

//  switch(suffixe) {
//    case'/index':
//    corps = Buffer.from('Bravo c\'est la bonne page !');
//    break;
//    default:
//      corps = Buffer.from('vérifier le chemin, il doit contenir "/index !"');
//      break;
//  }
   
// ////////////////////////////////////

//   reponseHTTP.writeHead(200, "En fonction : ok", {
//     "Content-Type": "Text/html",
//     "Content-Length": "Buffer.byteLength",
//   })

//   reponseHTTP.write(corps, function() {
//     reponseHTTP.end();
//   });

// });

// httpServer.listen(port)



/**
  2.
  Améliorez votre serveur HTTP pour que, si l'URL employé pour effectuer la
  requête HTTP ne contient pas /index, votre serveur HTTP produise une réponse
  HTTP avec dans :
   - l'en-tête, un code 404;
   - le corps, un message en format HTML valide du type :
     L'URL demandé n'existe pas.
**/
const http = require('http');
const httpServer = http.createServer();
const port = 8080;
let status = '';

httpServer.on("request" , function( requeteHTTP , reponseHTTP ){
 
 const urlEnFormatBrut = requeteHTTP.url;
 const parsedUrl = new URL(urlEnFormatBrut, `http://${requeteHTTP.rawHeaders[1]}`);

 parsedUrl;

 const suffixe = parsedUrl.pathname;

 let corps;
 let reponseServeur;

 switch(suffixe) {
   case'/index':
   status = 200;
   corps = Buffer.from('Bravo c\'est la bonne page !');
   reponseServeur = "La page est en affichage , index est bien dans l'URL "
   break;
   default:
     status = 404
     corps = Buffer.from('vérifier le chemin, il doit contenir "/index !"');
     reponseServeur = "La page est introuvable : /index n'est pas dans l\'URL"
     break;
 }
   
////////////////////////////////////

  reponseHTTP.writeHead(status, reponseServeur, {
    "Content-Type": "Text/html",
    "Content-Length": "Buffer.byteLength",
  })

  reponseHTTP.write(corps, function() {
    reponseHTTP.end();
  });

});

httpServer.listen(port)
/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
