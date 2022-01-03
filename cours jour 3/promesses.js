// pour créer le package.JSON : dans console : npm init -y
// pour es6 : ajouter type : module




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





/**************************** LES PROMESSES EN JAVASCRIPT ****************************/





// EN STOCKANT DIRECTEMENT UNE PROMESSE DANS UNE VARIABLE...

// Par convention, on écrit resolve, reject pour les callbacks de Promise...

// const maPromesse = new Promise((executeSiPromesseResolue, executeSiPromesseEchouee) => {
//   console.log('La promesse est remplie si le nombre est supérieur à 50...');
//   let nombreAleatoire = NaN;

//   for (let i = 0; i < 100000000; i++) {
//     nombreAleatoire = Math.ceil(Math.random() * 100);
//   }

//   if (nombreAleatoire > 50) {
//    executeSiPromesseResolue(`Promesse résolue avec succès : ${nombreAleatoire}`);
//   } else {
//     executeSiPromesseEchouee(`Promesse échouée : ${nombreAleatoire}`);
//   };
// });

// OU BIEN AVEC UNE FONCTION EXECUTRICE...

const maFonctionExecutrice = (resolve, reject) => {
  console.log('La promesse est remplie si le nombre est supérieur à 50...');
  let nombreAleatoire = NaN;

  console.log('Console.log placé au-dessus du code asynchrone et exécuté avant !');

  setTimeout(() => {
    nombreAleatoire = Math.ceil(Math.random() * 100);
    if (nombreAleatoire > 50) {
      resolve(`Promesse résolue avec succès : ${nombreAleatoire}`);
    } else {
      reject(`Promesse échouée : ${nombreAleatoire}`);
    };
  }, 3000);

  console.log('Console.log placé en-dessous du code asynchrone mais exécuté avant !');
};

const maPromesseAvecFonctionExecutrice = new Promise(maFonctionExecutrice);

console.log(maPromesseAvecFonctionExecutrice);

// ON RECUPERE ENFIN LES INFOS DE LA PROMESSE AVEC THEN ET CATCH...

// maPromesse
//   .then((donneesRecuesSuiteAPromesseResolue) => {
//     console.log(donneesRecuesSuiteAPromesseResolue);
//   })
//   .catch((donneesRecuesSuiteAPromesseEchouee) => {
//     console.log(donneesRecuesSuiteAPromesseEchouee);
//   });

maPromesseAvecFonctionExecutrice
  .then((donneesRecuesSuiteAPromesseResolue) => {
    console.log(donneesRecuesSuiteAPromesseResolue);
  })
  .catch((donneesRecuesSuiteAPromesseEchouee) => {
    console.log(donneesRecuesSuiteAPromesseEchouee);
  });
  
  
  /*********************************************************************/
  
  
// ON PEUT AUSSI OBTENIR LE MÊME RESULTAT AVEC ASYNC/AWAIT...

const getPromiseData = async () => {
  console.log('[3] La promesse est remplie si le nombre est supérieur à 50...');
  let nombreAleatoire = NaN;
  let result = '';

  for (let i = 0; i < 100000000; i++) {
    nombreAleatoire = Math.ceil(Math.random() * 100);
  }

  if (nombreAleatoire > 50) {
    result = `Promesse résolue avec succès : ${nombreAleatoire}`;
  } else {
    result = `[4] Promesse échouée : ${nombreAleatoire}`;
    throw new Error(result);
  };

  return result;
};


async function anotherAsyncFn() {
  let result = '';
  try {
    console.log('[2] console.log AVANT la déclaration de resultatObtenu');

    result = await getPromiseData(); // équivalent à getPromiseData().then(donneesRecues => result = donneesRecues;)

    console.log('[4] result : ', result);
  } catch (error) {
    console.log(error);
  };
  return result;
};

console.log('[1] console.log AVANT invocation de anotherAsyncFn');
const resultatFinal = await anotherAsyncFn();
console.log('[5] console.log APRES invocation de anotherAsyncFn');
console.log('[6] resultatFinal : ', resultatFinal);



// Si on veut ne pas utiliser de top-level await (ce qui est préférable...) :

const getPromiseData = async () => {
  console.log('[3] La promesse est remplie si le nombre est supérieur à 50...');
  let nombreAleatoire = NaN;
  let result = '';

  for (let i = 0; i < 100000000; i++) {
    nombreAleatoire = Math.ceil(Math.random() * 100);
  }

  if (nombreAleatoire > 50) {
    result = `Promesse résolue avec succès : ${nombreAleatoire}`;
  } else {
    result = `[5] Promesse échouée : ${nombreAleatoire}`;
    throw new Error(result);
  };

  return result;
};

async function anotherAsyncFn() {
  let result = '';
  try {
    console.log('[2] console.log AVANT la déclaration de resultatObtenu');

    result = await getPromiseData(); // équivalent à getPromiseData().then(donneesRecues => result = donneesRecues;)

    console.log('[5] result : ', result);
  } catch (error) {
    console.log(error);
  };
  return result;
};

console.log('[1] console.log AVANT invocation de anotherAsyncFn');
(function logData() {
  return async function() {
    const resultatFinal = await anotherAsyncFn();
    console.log('[6] resultatFinal : ', resultatFinal);
    return resultatFinal;
  }
})();

console.log('[4] console.log APRES invocation de anotherAsyncFn');


/*********************************************************************/


// UTILISATION DU MODULE PROMISES DE NODEJS AVEC FILE SYSTEM : fsPromises


import fs from 'fs';
import fsPromises from 'fs/promises';
// OU BIEN en utilisant la destructuration d'assignation 
// import { readFile } from 'fs/promises';


// Le module file system synchrone avec callback

let path = '';
fs.readFile(path, (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(data.toString());
  }
});

// Le module fsPromises avec une Promise "standard"

function getPromiseData(path) {
  let fileToGet = '';
  fsPromises.readFile(
    path,
    'utf-8',
  )
    .then(data => {
      fileToGet = data.toString();
      console.log('fichier reçu : ', fileToGet);
      return fileToGet;
    })
    .catch(error => {
      throw new Error(error);
    })
    .finally(() => {
      console.log('TOUJOURS EXECUTE');
    })
};

getPromiseData('./exercices/2 - Serveurs/error.html');

// LA MEME CHOSE AVEC ASYNC / AWAIT

async function getAsyncAwaitData(path) {
  let fileToGet = '';

  try {
    fileToGet = await fsPromises.readFile(path, 'utf-8');
    console.log(fileToGet);
  } catch (error) {
    throw new Error(error);
  } finally {
    console.log('TOUT EST TERMINE !');
  };
  return fileToGet;
}
const fichierRecuAsyncAwait = await getAsyncAwaitData('./exercices/2 - Serveurs/error.html');
console.log('fichierRecuAsyncAwait : ', fichierRecuAsyncAwait);


/*********************************************************************/


// Contourner le problème résultant du fait que le mot-clef "await" ne peut pas être
// utilisé en dehors du contexte d'une fonction asynchrone...

// On crée une fonction synchrone qui retourne une fonction anonyme asynchrone qui
// elle-même exécute une fonction asynchrone par le biais du mot-clef "await" et
// retourne le résultat...
function getData() {
  return async function() {
    const fichierRecuAsyncAwait = await getAsyncAwaitData('./exercices/2 - Serveurs/error.html');
    console.log('fichierRecuAsyncAwait : ', fichierRecuAsyncAwait);
    return fichierRecuAsyncAwait;
  };
};

const returnData = getData()();
console.log('returnData : ', returnData);


// OU BIEN... 

// On fait la même chose que l'exemple précédent, mais par le biais d'une IIFE...
// (Immediately Invoked Function Expression)...
(function getData() {
  return async function() {
    const fichierRecuAsyncAwait = await getAsyncAwaitData('./exercices/2 - Serveurs/error.html');
    console.log('fichierRecuAsyncAwait : ', fichierRecuAsyncAwait);
    return fichierRecuAsyncAwait;
  };
})()();