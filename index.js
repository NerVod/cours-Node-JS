https://betterprogramming.pub/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8
// article sur le "THIS"




// function addNumbers(num1, num2) {
//   console.log("Numbers added !");
//   return num1 + num2;
// }

// const somme = addNumbers(40, 2);
// console.log("Somme obtenue : ", somme);

// function trySomething() {
//   try {
//     console.log("Exécution réussie");
//     throw new Error("Quelquechose s'est mal passé...");
//   } catch (error) {
//     console.log(error);
//   }
// }
// trySomething();

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// function trySomething(num1, num2) {
//   let result = "";
//   try {
//     if (typeof num1 === "number") {
//       result = num1 + num2;
//     } else {
//       throw new Error("Quelquechose s'est mal passé...");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// const resultOk = trySomething(12, 5);
// const resultPasOk = trySomething("Coucou", 5);

// console.log("result ok :", resultOk);
// console.log("result pas ok ", resultPasOk);

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// function logThis(message) {
//   console.log("Message dans la fonction régulière ", message);
// }

// logThis("Coucou");

// const returnThat = (message) => {
//     // console.log("Message dans la fonction flèche ", message);
//     return message;
// }
// équivalent en ES6  à : (mais moins lisible)
// const returnThat = (num1, num2) => num1 + num2;
// console.log(returnThat(1, 5));

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// //ES5
// let person = {
//   name: "Toto",
//   logThis: function () {
//     setTimeout(
//       function () {
//         console.log(this.name);
//       }.bind(person),
//       500
//     );
//   },
// };
// person.logThis();

// //ES6
// let person2 = {
//   name: "Titi",
//   logThat() {
//     setTimeout(() => {
//       console.log(this.name);
//     }, 1000);
//   },
// };
// person2.logThat();

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// console.log("Dossier courant ", __dirname);
// console.log("Nom du fichier ", __filename);

// const workingDir = process.cwd();
// console.log(workingDir);

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// const unPremierMot = "mot";
// const unSecondMot = "été";

// const premierMotBuffer = Buffer.from(unPremierMot);
// console.log(premierMotBuffer);
// console.log("taille de premierMotBuffer: ", premierMotBuffer.length);

// const secondMotBuffer = Buffer.from(unSecondMot);
// console.log(secondMotBuffer);
// console.log("taille de secondMotBuffer: ", secondMotBuffer.length);
// console.log(
//   "poids en octets d'une chaîne de caractères: ",
//   Buffer.ByteLength("Nous faisons un cours de NodeJS")
// );

// buffer convertit des chaines de caractères en "octets (bytes)"

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// const mesFonctionsDeLog = require("./mon super dossier/module1");

// //console.log("mesFonctionsDeLog: ", mesFonctionsDeLog);

// mesFonctionsDeLog.arrow();
// mesFonctionsDeLog.regular();

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// const moduleFsDeNode = require("fs");

// // console.log(moduleFsDeNode);

// const monFichierHtml = moduleFsDeNode.readFileSync(
//   "./mon-super-dossier/index.html",
//   {
//     encoding: "utf-8",
//     flag: "r",
//   }
// );
// console.log("fichier trouvé: ", monFichierHtml);


/////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

// comparatif de portée de This en fonction du contexte d'exécution et déclaration avec donction flèche ou fonction régulière


// global.name = "valeur de name dans global";

// const myArrowFn = (name = "Valeur par défaut de name dans arrow fn") => {
//   this.name = name;
//   console.log("this dans arrow function: ", this);
//   console.log("arrow function this.name value: ", this.name);
// };

// function myRegularFn() {
//   console.log("regular function this.name value: ", this.name);
// }

// const myObject = {
//   name: "valeur de name dans myObject",
//   myMethod: myRegularFn,
//   mySecondMethod() {
//     console.log("object method this.name value: ", this.name);
//   },
// };

// myArrowFn(); // expected output: valeur par défaut
// myArrowFn("Toto"); // expected output: "Toto"
// myRegularFn(); // expected output: "TOTO"
// myObject.myMethod(); // expected output: "TITI"
// myObject.mySecondMethod(); // expected output: "TITI"



////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Rappel interpolation :

// const myVar = 'Coucou'
// const mySecondVar = 'Tout le monde'

// const mySentence = `${myVar} ${mySecondVar}` 
// // donne Coucou tout le monde


////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////      ES5  ///////////////////////////

// const monModule1 = require("./mon-super-dossier/module1.js");
// monModule1.regular();


//////////////           ES6    ////////////

// import monModule1, {logDirRegular} from "./mon-super-dossier/module1.js";

// // Equivalent à 
// //const monModule1 = require("./mon-super-dossier/module1.js")

// // et avec destructuration d'assignation :
// //const {logDirFleche, logDirRegular} = require('./mon-super-dossier/module1.js);

// monModule1();
// logDirRegular();


////////////////////////////////////////////
 //Exemple destructuration d'un objet 


 //test sur navigateur Chrome

// const monObjet = {
//   name:'Toto',
//   age: 45,
//   email: 'toto@gmail.com',
//   adresse :{
//       codePostal : 75011,
//       ville: 'Paris',
//       pays: 'France',
//       },
//   };
   // "enter" pour enregister dans la console
  undefined

  // // puis déstructuration de l'objet avec propriétés du meme nom que dans l'objet :
  // const {name, age, email} = monObjet
  // undefined
  // // on a ensuite accès aux propriétés directement :
  // name
  // 'Toto'

  ////////////////////////////////////////////

// copie de tableaux ( exemple dans un navigateur)
//   const {name, age, email} = monObjet
// undefined
// name
// 'Toto'
// const tableau1 = ['Hello', 'Coucou'];
// undefined
// const tableau2 = [42,45];
// undefined
// const tableau3 = [...tableau1, ...tableau2]
// undefined
// tableau3
// ['Hello', 'Coucou', 42, 45]

/////////////////////////////////////////////
//installer une dépendence//
import chalk from 'chalk';

console.log(chalk.blue('Hello world!'));

console.log(chalk.bgRed('ARCHTUNG !'));



// installer une dépendance 'développeur'
// $ npm install  --save-dev chalk;

////////////////////////////////////

// exemple asynchrone
console.log ('1');
console.log ('2');
console.log ('3');
setTimeout(() => {
  console.log ('4');
  console.log ('5');
}, 1000);
console.log ('6');
setTimeout(() => {
  console.log ('7');
}, 3000);
console.log ('8');


import moduleFileSystem from 'fs'

function readOneFile(path){
  moduleFileSystem.readFile(
    path,
    (erreur,donnees) => {
      if(erreur) {
        throw new Error(erreur);
      } else {
        console.log("données récupérées : ", donnees)
      }
    }
  )
}


////////////////////////