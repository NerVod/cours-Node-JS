/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 18.17.19.20
   - Port : 6767
   - Ressource : /bonjour.html
   - Query String : nom=Bruce&prenom=Wayne

  Donne l'URL : http://212.121.212.45:6767/bonjour.html?nom=Bruce&prenom=Wayne
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de
  caractères facilement reconnaissables. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier les
  deux chaînes de caractères par respectivement le nom et le prénom provenants du
  Query String.

  Pour extraire des données provenant d'une Query String contenu dans un URL,
  vous pouvez utiliser le module URL (WHATWG API) de Node JS. Ce module est documenté ici :
    https://nodejs.org/api/url.html
**/

/**
  2. Votre programme ne doit pas planter si la Query String n'est pas fournie ou
  que les informations demandées n'y figurent pas.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
