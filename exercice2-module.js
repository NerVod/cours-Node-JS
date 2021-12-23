// import { cwd } from "process";

const { cwd } = require('process');

const afficheModule = function () {
  console.log("Je suis un module secondaire");
  console.log(`emplacement du module : ` + __dirname);
  console.log(`dossier execution: ${cwd()}`);
};
// afficheModule();



module.exports = { 
  fonctionPropriete: function() {
    console.log(`je viens de la propriété exportée dans le module du fichier : ` + __filename + ` dans le dossier : ` + __dirname )
    console.log("Je suis un module secondaire");
    console.log(`emplacement du module : ` + __dirname);
    console.log(`dossier execution: ${cwd()}`);
  },
  tableau: ["Mon premier", " puis mon second", " et mon troisième"]

};






// module.exports = { 
//     tableau: tableau 
//   } ;


/////////////////////////////////////////
// exercice 3
const fs = require('fs');

let lireFichier = function(chemin) {
  try {
    let data = fs.readFileSync(chemin, 'utf8',)
    console.log(`données deportees: `+ data.toString());
    } 
    catch {
      console.log('Error deporte : pas de fichier à lire');
    }
}

module.exports = {
  lireFichier: function(chemin) {
    try {
      let data = fs.readFileSync(chemin, 'utf8',)
      console.log(`données deportees: `+ data.toString());
      } 
      catch {
        console.log('Error deporte : pas de fichier à lire');
      }
  }
}


