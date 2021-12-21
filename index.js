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

const moduleFsDeNode = require("fs");

// console.log(moduleFsDeNode);

const monFichierHtml = moduleFsDeNode.readFileSync(
  "./mon-super-dossier/index.html",
  {
    encoding: "utf-8",
    flag: "r",
  }
);
console.log("fichier trouvé: ", monFichierHtml);
