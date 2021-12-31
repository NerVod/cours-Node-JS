/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 31.42.53.64
   - Port : 5555
   - Ressource : /accueil

  Donne l'URL : http://31.42.53.64:5555/home
**/

/**
  Exercices :

  1.
  Créez deux fichiers HTML valides : home.html et about.html

  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP
  - le contenu du fichier home.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /accueil
  - le contenu du fichier about.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /apropos
**/

/**
  Exercices :

  2. Créez un fichier HTML valide : 404.html

  Votre serveur HTTP doit retourner dans sa réponse HTTP le contenu du fichier
  404.html si l'URL utilisé pour effectuer la requête HTTP ne contient pas la
  ressource /accueil ou /apropos.

  N'oubliez pas de préciser le code 404 dans les en-têtes de la réponse HTTP.
**/
const http = require('http')
const fs = require('fs')
const server = http.createServer();

let path = ""
let status;


server.on("request", function(req, res){

  const urlEnFormatBrut = req.url;
  const parsedUrl = new URL(urlEnFormatBrut, `http://${req.rawHeaders[1]}`);
 
  parsedUrl;
 
  const suffixe = parsedUrl.pathname;

 
if (suffixe === '/accueil') {
  status = 200;
  path = "home.html";
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf8"
  })
  fs.readFile(path, 'utf8', (err, data) => {
    if(err) throw err
    res.write(data)
    res.end()
  })

} else if (suffixe === "/apropos") {
    status = 200;
    path= "about.html";
    res.writeHead(status, {
      "Content-Type": "text/html; charset=utf8"
    })
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) throw err
      res.write(data)
      res.end()
    })
} else {
  status = 404;
  path ="404.html";
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf8"
  })
  fs.readFile(path, 'utf8', (err, data) => {
    if(err) throw err
    res.write(data)
    res.end()
  })
}
})
    


server.listen(8080);

  
     

  



/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
