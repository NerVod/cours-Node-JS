// const logDir = () => {
//     console.log("Dossier de module1 ", __dirname);
// }

// ////////////////   ES5    /////////////////////

// const logDirFleche = () => {
//   console.log("Dossier de module1.js avec arrow function", __dirname);
// };

// function logDirRegular() {
//   console.log("Dossier de module1.js avec regular function: ", __dirname);
// }

// //////////////////
// module.exports = {
//   arrow: logDirFleche,
//   regular: logDirRegular,
// };

////////////     ES6  //////////////////////

export default () => {
  console.log("Dossier de module1.js avec arrow function", __dirname);
};

export function logDirRegular() {
  console.log("Dossier de module1.js avec regular function: ", __dirname);
}
