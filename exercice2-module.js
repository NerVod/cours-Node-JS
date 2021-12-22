import { cwd } from "process";

const afficheModule = function () {
  console.log("Je suis un module secondaire");
  console.log(`emplacement du module : ` + global.__dirname);
  console.log(`dossier execution: ${cwd()}`);
};
afficheModule();

export default afficheModule;


const tableau = ["mon premier", "Mon second", "mon troisième"];

module.exports = { tableau } ;