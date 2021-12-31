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


const http = require('http')
const fs = require('fs')
const path = "home.html"

const server = http.createServer((req, res) =>{
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf8"
  })
  fs.readFile(path, 'utf8', (err, data) => {
    if(err) throw err
    res.write(data)
    res.end()
  })
})
server.listen(8080);



/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
