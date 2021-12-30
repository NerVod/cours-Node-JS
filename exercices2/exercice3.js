/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 1.2.3.4
   - Port : 7777

  Donne l'URL : http://1.2.3.4:7777
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de
  réponse en format HTML obtenu à partir du contenu d'un fichier.

  Vous devez donc créer un fichier HTML valide à coté de votre programme.

  A chaque requête HTTP reçue, vous utiliserez les méthodes asynchrones de
  l'objet FileSystem de Node JS pour lire et obtenir le contenu de votre fichier
  HTML. Puis, vous produirez une réponse HTTP contenant le contenu du fichier
  HTML.
**/
///////////////////////////////////////////////////////////
// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const path = require('path');
// const httpServer = http.createServer();

// httpServer.on('request', function(requeteHTTP, reponseHTTP) {
//   const urlEnFormatBrut = requeteHTTP.url;
//   const parsedUrl = new URL(urlEnFormatBrut, `http://${requeteHTTP.rawHeaders[1]}`) ;

//   // const baseFolder = process.cwd();
//   // const requiredFilePath = path.normalize(baseFolder + parsedUrl.path);
//   const requiredFilePath= ('./index.html')

//   let corps;

//   fs.readFile(requiredFilePath, function (err, data) {
//     if(err) {
//       let corps = Buffer.from('<!doctype html><html><head><meta charset="UTF-8"><title>Erreur 404</title></head><body><h1>Erreur 404</h1><p>Erreur 404 : Cette page n\'existe pas.</p></body></html>');

//       reponseHTTP.writeHead(404, {
//         'Content-Type': 'text/plain',
//         'Content-Length': 'corps.length'
//       });

//     } else {
//       let corps = data;

//       reponseHTTP.writeHead(200, {
//         'Content-Type': 'text/plain',
//         'Content-Length': 'corps.length'
//       });
//     };

//     reponseHTTP.write(corps, function() {
//       reponseHTTP.end();
//     });
//   });
// });

// httpServer.listen(8080);
/////////////////////////////////////////////////////////////////

const http = require('http')
const fs = require('fs')

http.createServer(function(req, res) {
  fs.readFile()
})







/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
