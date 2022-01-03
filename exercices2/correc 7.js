/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 212.121.212.45
   - Port : 8080
   - Ressource : /index.html

   Donne l'URL : http://212.121.212.45:8080/index.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez une chaîne de caractères
  facilement reconnaissable. Par exemple :
  - ##dateDuJour##

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier la
  chaîne de caractères par la date du jour.
**/

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Requête reçue : ', req.url);
  const reqUrl = req.url;

  let filePath = '';
  let mimeType = 'text/plain';

  if (reqUrl === '/accueil') {
    filePath = './info.html';
    mimeType = 'text/html';
  }

  if (reqUrl === '/date') {
    filePath = './date.html';
    mimeType = 'text/html';
  }

  if (reqUrl.includes('.jpg')) {
    mimeType = 'image/jpeg';
    filePath = './react-redux.jpg';
  }

  if (reqUrl.includes('.ico')) {
    mimeType = 'image/jpeg';
    filePath = path.join(__dirname + '/react-redux.jpg');
  }

  console.log('filePath detected: ', filePath);


  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw new Error(err);
    } else {
      // On stocke le contenu du fichier dans une variable sous la forme d'une string
      let file = data;

      console.log('file: ', file);
      
      // On vérifie le filePath du fichier pour déterminer les remplacements à effectuer
      if (filePath === './info.html') {
        file = file.toString().replace('{{prenom}}', 'Alex').replace('{{nom}}', 'Masson');
      }

      if (filePath === './date.html') {
        const date = new Date();
        const today = date.toLocaleDateString('fr-FR');
        file = file.toString().replace('##date du jour##', today);
      }

      // Enfin, on envoie notre réponse au navigateur avec le fichier dont le contenu aura préalablement été modifié
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': Buffer.byteLength(file),
      });

      res.write(file);
      res.end();
    }
  });
});

// console.log('file : ', file);


server.listen(8080, () => {
  console.log('Server lancé sur le port 8080');
});

/**
  2. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de
  caractères facilement reconnaissables. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier les
  deux chaînes de caractères par respectivement votre nom et votre prénom.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
