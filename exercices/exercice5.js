/**
  Node JS est installé avec npm. Il s'agit d'un utilitaire qui vous permet de
  télécharger des modules complémentaires créés par la communauté des
  développeurs de Node JS à partir du site éponyme : www.npmjs.com.

  Pour utiliser npm on doit d'abord initialiser un projet. C'est une opération
  qui consiste à créer un fichier package.json qui contiendra des métadonnées
  sur le projet ainsi que la liste des modules complémentaire installés.

  Pour initialiser un projet npm :

  - npm init

  et on renseigne les informations demandées ou on laisse les informations
  par défaut. Cette commande est à taper 1 seule et unique fois à la racine d'un
  projet lors de son initialisation.

  Puis, pour installer un module complémentaire qu'on a trouvé sur
  www.npmjs.com :
  - npm install [nom du module]
  ou
  - npm i [nom du module]
  Lorsqu'un module est installé, il est téléchargé dans le dossier node_modules
  avec tous les modules dont il dépend. Le nom du module ainsi que sa version
  est incrite automatiquement dans le fichier package.json. La liste des modules
  dont il dépend ainsi que leur versions respectives est inscrite
  automatiquement dans le fichier package.json.lock.

  Nous allons égayer le terminal en utilisant le module chalk documenté ici :
    https://www.npmjs.com/package/chalk
**/

/**
  Exercice :

    1.
    Initialisez un projet npm et installez le module chalk. Puis verifiez
    qu'il est bien installé dans le dossier node_modules de votre projet.
**/

/**
    2.
    Chargez le module chalk dans votre module principal et affichez dans la
    console en VERT un message pour indiquer que chalk est installé.
**/

/**
    3.
    - Affichez un message d'erreur en rouge
      * par exemple : `Une erreur est survenue !`
    - Affichez un message de debug en gris
      * par exemple : `Ceci est un message de debug`
    - Affichez un message important en gras
      * par exemple: `Ceci est un message important !`
**/

/**
    4.
    Prenez l'habitude d'utiliser :
      - chalk documenté ici : https://www.npmjs.com/package/chalk
      - ou colors documenté ici : https://www.npmjs.com/package/colors
    pour améliorer la lisibilité de la console.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
