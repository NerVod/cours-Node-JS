/**
  Node JS est modulaire et propose aux développeurs un ensemble de modules de
  base pour démarrer leurs projets. Le premier module que nous allons utiliser
  est le module de base FileSystem. Ce module permet d'obtenir un objet de
  type FileSystem.

  Ce module est documenté ici : https://nodejs.org/api/fs.html

  Un objet de type FileSystem contient un ensemble de méthodes pour manipuler
  le système de fichier de l'ordinateur sur lequel s'exécute le programme.
  Pour charger obtenir cet objet, on doit charger le module en utilisant le
  chemin 'fs'. Par exemple :

  var monModuleFileSystem = module.require('fs');

  Mais la bonne pratique et l'habitude est plutôt d'écrire :

  const monModuleFileSystem = require('fs');

  --> const est un mot-clé qui joue le même rôle que var. Il permet de créer une
      variable dans un contexte. La principale différence entre const et var est
      qu'une variable créée avec const ne peut pas être modifiée par la suite.
      Ici on utilise const plutôt que var car on ne va (certainement) pas
      modifier le contenu de l'objet FileSystem. Il s'agit donc là d'une bonne
      pratique (const est documenté ici sur le MDN :
        https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/const).

  --> require() plutôt que module.require(). La variable require contient une
  référence à la méthode module.require. Donc par gain de temps, on préfère
  écrire require(). Il s'agit donc là d'une habitude.

  L'objet FileSystem contient des méthodes SYNCHRONES et des méthodes
  ASYNCHRONES. Par exemple :

  - La méthode .writeFileSync() permet d'écrire des données dans un fichier de
  façon SYNCHRONE. Tant que les données n'ont pas été totalement été écrites
  dans le fichier, la méthode bloque le programme. La suite du code n'est
  pas exécutée.

  - La méthode .writeFile() permet d'écrire des données dans un fichier de façon
  ASYNCHRONE. Pendant que les données sont écrites dans le fichier, la suite du
  code est exécutée. Si on souhaite exécuter du code qui est conditionné à la
  fin de l'écriture des données dans le fichier, on devra fournir à la méthode
  .writeFile() un "callback", c'est à dire une fonction qui sera exécutée par la
  méthode .writeFile() à la fin de l'écriture des données.

  La plupart du temps lorsqu'on utilise des modules de Node JS, on dispose de
  méthodes SYNCHRONES et ASYNCHRONES. Et, on préfère utiliser les méthodes
  ASYNCHRONES pour des questions de performance. Le sens de lecture du code
  (de haut en bas) NE REFLETE PAS FORCEMENT l'ordre d'exécution des
  instructions !
**/

/**
  Exercices :

  1.
  Écrivez un programme qui créé un fichier texte (de façon asynchrone) encodé
  en utf8 contenant le message `Ceci est un message écrit par Node JS`.
**/
const fileSystem = require('fs');

const fileContent = "`Ceci est un message écrit par Node JS"

const filePath = "exercice3.txt";

fileSystem.writeFile(filePath,fileContent, (err) => {
  if (err) throw err;

  console.log("Le fichier a correctement été créé")
})

/**
  2.
  Écrivez un programme qui vérifie si un fichier texte existe et qui affiche
  son contenu dans le terminal si et seulement si il existe.

  -> Vous devez utiliser la méthode .access() (qui est ASYNCHRONE) de votre
  objet FileSystem pour vérifier l'existence du fichier.

  -> Vous devez utiliser la méthode .readFile() (qui est ASYNCHRONE) de votre
  objet FileSystem pour lire le contenu d'un fichier encodé en utf8.

  POINT D'ATTENTION : les "callback" (les fonctions qui seront exécutées)
  doivent souvent prévoir d'accepter des arguments qui seront fournis par les
  méthodes asynchrones qui les exécutent.
**/
const file = "exercice3.txt"

fileSystem.access(file, fileSystem.constants.F_OK, (err) => {
  if (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
  } else {
    console.log(`${file} exists, and it is writable`);
  }
});


/**
  3.
  Écrivez un programme qui affiche dans la console le contenu d'un fichier,
  si il existe, dont le nom/chemin est passé en argument lors de l'exécution du
  programme.
**/

/**
  4.
  Modifiez votre programme précédent pour créer une fonction qui prend en
  argument un nom de fichier et qui affiche son contenu dans la console.
  Modularisez votre code (i.e : mettez cette fonction dans un module et utilisez
  la fonction de votre module ici, dans votre module principal.

  ATTENTION: Vous devez charger le module FileSystem dans votre module
  secondaire.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
