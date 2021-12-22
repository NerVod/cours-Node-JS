/**
  Node JS propose un mécanisme pour favoriser la modularité du code. Les
  programmes écrits pour Node JS sont considérés par Node JS comme des modules.
  Et les modules de Node JS peuvent faire appel à d'autres modules ! A tout
  moment dans un module exécuté sous Node JS, on dispose d'un objet Module.

  L'objet Module est documenté ici :
    https://nodejs.org/docs/latest/api/modules.html

  Cet objet est accessible à tout moment à partir de la variable module. Il
  contient des méthodes comme :

  - module.require() : Cette méthode permet de charger un module dans un autre.
  Elle prend en argument le chemin vers le fichier ou le nom du fichier
  contenant le module à charger.

  SI on fournit le CHEMIN COMPLET vers le fichier contenant le module à charger :
  elle essaie de charger le module.

  SINON SI on ne fournit que le nom du fichier à charger (sans préciser le
  chemin) :
    - elle essaie de charger le module à partir du dossier node_modules qui est
      dans le dossier du projet.
    - elle essaie de charger le module à partir du dossier node_modules qui est
      dans le dossier contenant le dossier du projet.
    ...ainsi de suite jusqu'à la racine du système de fichiers.
    - Si le dossier node_modules reste introuvable, elle essaie de charger le
    module à partir du dossier node_modules qui est dans le dossier
    d'installation de Node JS

  Dans les 2 cas :
  SI on a précisé l'extension du fichier : elle charge le module.
  SINON SI on n'a pas précisé l'extension :
    - elle essaie de charger le module sans extension SINON
    - elle essaie de charger le module avec l'extension .js SINON
    - elle essaie de charger le module avec l'extension .json SINON
    - elle essaie de charger le module avec l'extension .node (uniquement s'il
      s'agit d'un fichier binaire, probablement obtenu à partir d'un programme
      en C)

  La bonne pratique consiste à créer un dossier node_modules dans le dossier de
  son projet pour y placer les programmes qui seront utilisés comme modules
  d'autres programmes.
**/

/**
  Exercices :

    1.
    Votre module principal affiche le texte "Je suis le module principal !"
    dans la console. Créez un module que vous appellerez exercice2-module.js
    qui affiche le texte "je suis un module secondaire !" dans la console.

    Chargez ce module dans le module principal pour que les 2 messages soient
    affichés à la suite.
**/

console.log("Je suis un module principal");

import moduleSecondaire from "../exercice2-module.js";

/**
    2.
    Dans votre module secondaire, faîtes en sorte d'afficher :
      - Le nom du dossier dans lequel le module se situe (voir Global)
      - Le nom du dossier à partir duquel le module est exécuté (voir Process)

    Cette expérience illustre la subtilité qui existe entre les 2 techniques...
**/

/**
    3.
    Reprenez l'exercice précédent. La fonction fera l'objet d'un module.
    Votre module doit faire appel au module contenant la fonction et l'utiliser
    pour afficher des messages dans la console.

    PROBLEME : Vous avez probablement déclaré votre fonction de façon anonyme et
    en utilisant la notation const maFonction = function(){}... et c'est très
    bien ! La référence à votre fonction est donc contenue dans une variable
    locale à l'objet Global du module et votre fonction n'a pas de nom dans
    l'espace mémoire. En d'autres termes, votre fonction n'existe QUE dans le
    module dans lequel elle est créé.

    SOLUTION : La méthode module.require() prend en argument un chemin vers un
    fichier et RETOURNE un objet. Cet objet est l'objet défini dans un module
    dans la propriété module.exports. En d'autres termes, si le module A
    utilise module.require() pour charger le module B, le module A obtient
    l'objet défini dans le module B dans la propriété module.exports.

    --> Dans votre module secondaire (celui ou vous avez mis la fonction),
        stockez une référence à la fonction dans une propriété de
        module.exports.
    --> Dans votre module principal (celui-ci), utilisez la fonction (qui sera
        donc une méthode de l'objet retourné par la méthode module.require())
**/

/**
    4.
    Dans votre module secondaire :
      - Déclarez un Array contenant 3 messages. Affichez la concaténation des 3
      messages à partir de votre module principal.
      - Déclarez un objet qui contient 1 propriété et 1 méthode qui utilise
      cette propriété pour l'afficher dans la console. Utilisez cet objet dans
      votre module principal en exécutant sa méthode.
      **/
import tableau from "../exercice2-module";
console.log(tableau[0] + " " + tableau[1] + " " + tableau[2]);

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
