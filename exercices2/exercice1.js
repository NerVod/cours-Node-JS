/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 100.50.25.12
   - Port : 6666

   Donne l'URL : http://100.50.25.12:6666
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide.

  Attention, vous devez pensez à retourner dans l'en-tête de votre réponse HTTP
  le Mime Type correct (pour le HTML, il s'agit du Mime Type text/html)
**/
const http = require('http');
const httpServer = http.createServer();
const port = 8080;

httpServer.on("request" , function( requete , reponse ){
  const reqUrl = requete.url;
  console.log("requete: ", requete);

  const reponseDuServeur = "mon Serveur pour exercices Node JS exo1";

  reponse.writeHead(200, "En fonction : ok", {
    "Content-Type": "Text/html",
    "Content-Length": "Buffer.byteLength",
  })

  reponse.write(reponseDuServeur, function() {
    reponse.end();
  });

});

httpServer.listen(port, function() {
  console.log(`Le serveur écoute sur le port ${port}.`)
})




/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
