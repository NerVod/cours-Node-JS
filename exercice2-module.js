const afficheModule = function () {
  console.log("Je suis un module secondaire");
  console.log(`emplacement du module : ` + __dirname);
  const { cwd } = require("process");
  console.log(`dossier execution: ${cwd()}`);
};
afficheModule();