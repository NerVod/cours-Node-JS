








// const logDir = () => {
//     console.log("Dossier de module1 ", __dirname);
// }

const logDirFleche = () => {
  console.log("Dossier de module1.js avec arrow function", __dirname);
};

function logDirRegular() {
  console.log("Dossier de module1.js avec regular function: ", __dirname);
}

//////////////////
module.exports = {
  arrow: logDirFleche,
  regular: logDirRegular,
};
