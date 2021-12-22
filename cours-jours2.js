// Première partie : 1h de révision des concepts vus lors de la séance précédente
// Posez-moi toutes les questions qui vous passent par la tête concernant le sujet traité hier.

// Deuxième partie : import de module en ES6 (import/export) CJS vs ESM
// ES5- :
const monModule1 = require("./dossier/module1");
monModule1.regular();

// ES6

import monModule1, { logDirRegular } from "./dossier/module1.js";

// équivalent à :
const monModule1 = require("./dossier/module1.js");

// et avec destructuration d'assignation :
const { logDirFleche, logDirRegular } = require("./dossier/module1.js");

monModule1();
logDirRegular();

import RACLETTEAUPOIVRE from "fs";

const monFichierHtml = RACLETTEAUPOIVRE.readFileSync("./dossier/index.html", {
  encoding: "utf-8",
  flag: "as+",
});

console.log("Fichier trouvé par action synchrone: ", monFichierHtml);

// Troisième partie : npm et son utilisation (npm init, npm start, npm run <script> et npm install <module>)

import chalk from "chalk";

console.log(chalk.blue("Hello world!"));
console.log(chalk.redBright("ACHTUNG!"));

// Quatrième partie : la notion d'asynchronicité dans l'exécution de code JavaScript (callback, setTimeout)

// Exemple avec setTimeout():

console.log("1"); // quasi instantané
readOneFile("./dossier/index.html");
console.log("3"); // quasi instantané
setTimeout(() => {
  console.log("4");
}, 2000);
setTimeout(() => {
  console.log("5");
}, 1000);
console.log("6"); // quasi instantané
setTimeout(() => {
  console.log("7");
}, 4000);
console.log("8"); // quasi instantané

// Exemple avec le module File System de node.js
import moduleFileSystem from "fs";

// Functions with regular expression are hoisted
function readOneFile(path) {
  try {
    moduleFileSystem.readFile(path, (erreur, donnees) => {
      if (erreur) {
        throw new Error(erreur);
      } else {
        console.log("2");
        const stringifiedDonnees = donnees.toString();
        console.log("Données récupérées : ", stringifiedDonnees);
      }
    });
  } catch (erreur) {
    console.log(erreur);
  }
}

// Cinquième partie : le module HTTP de node.js (protocole HTTP, fonctionnement d'un serveur HTTP, node et sa gestion événementielle)

import { createServer } from "http";

const server = createServer();
const port = 8080;

server.on("request", (requete, reponse) => {
  const entetesRequete = requete.headers;
  const httpMethod = requete.method;
  const host = entetesRequete.host;
  const reqUrl = requete.url;
  //   const userAgent = entetesRequete["user-agent"];

  // Utilisation du constructeur URL pour créer un objet URL utilisable
  const myUrl = new URL(reqUrl, `http://${host}`);
  console.log("url pathname: ", myUrl.pathname);

  // La propriété searchParams de l'instance de URL contient
  // la query string dans la cas d'une requête GET.
  console.log("myUrl.searchParams: ", myUrl.searchParams);

  // variables amenées à être modifiées
  let reponseDuServeur = "";
  let reponseBuffer = "";
  let statusCode = 200;
  let statusMessage = "";
  let contentType = "";
  let contentLength = "";
  let reqParams = "";
  let reqBody = "";

  // On fait quelque chose si la méthode est POST.
  // Dans le cas d'une requête POST, la query string n'est
  // plus présente dans l'URL mais dans le 'body' de la requête,
  // pour des raisons de longueur maximale autorisée...
  if (httpMethod === "POST") {
    // L'événement 'data' se déclenche à chaque fois que
    // que des données sont reçues...
    requete.on("data", (morceauDeDonnee) => {
      reqBody += morceauDeDonnee;
      reqBody = reqBody.toString();
    });

    // L'événement 'end' se déclenche quand toutes les données
    // ont été reçues...
    requete.on("end", () => {
      // On crée un objet contenant les paramètres de la requête,
      // la fameuse 'query string', qui se trouve dans le 'body' de
      // la requête et plus dans l'URL...
      reqParams = new URLSearchParams(reqBody);

      // On applique cette vérification pour pouvoir avoir facilement
      // accès à l'auto-complétion pour les méthodes de reqParams qui
      // est à présent un objet de type UrlSearchParams...
      if (reqParams instanceof URLSearchParams) {
        reponseDuServeur = `Bonjour ${reqParams.get("prenom")} ${reqParams.get(
          "nom"
        )}!`;
      }
      // On convertit la réponse en Buffer avec Buffer.from()
      reponseBuffer = Buffer.from(reponseDuServeur, "utf-8");

      // On stocke la longueur en octets de la réponse dans une variable
      contentLength = Buffer.byteLength(reponseBuffer);
      contentType = "text/plain";
      statusCode = 200;
      statusMessage = "OK";

      // On définit à présent les en-têtes de notre réponse HTTP
      reponse.writeHead(statusCode, statusMessage, {
        "Content-Type": contentType,
        "Content-Length": contentLength,
      });

      // Puis enfin on définit le contenu et l'encodage de
      // notre réponse HTTP...
      reponse.write(reponseBuffer, "utf8", () => {
        reponse.end();
      });
    });
  }

  // On fait quelque chose si la méthode utilisée est GET
  if (httpMethod === "GET") {
    reponseBuffer = Buffer.from("Nous avons reçu une requête GET", "utf-8");
  }
});

// La méthode .listen() permet de déclarer le port et l'hôte
// d'écoute pour notre serveur...
server.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}.`);
});
