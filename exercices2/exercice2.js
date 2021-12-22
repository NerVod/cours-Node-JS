/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.30.20.30
   - Port : 8899
   - Ressource : /index

  Donne l'URL : http://10.30.20.30:8899/index
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide si et seulement si l'URL contenu dans la
  requête HTTP contient
    /index.

  Votre objet de type http.IncomingMessage contient une propriété .url vous
  permettant d'obtenir des informations relatives à l'URL employé pour effectuer
  la requête HTTP.
**/

/**
  2.
  Améliorez votre serveur HTTP pour que, si l'URL employé pour effectuer la
  requête HTTP ne contient pas /index, votre serveur HTTP produise une réponse
  HTTP avec dans :
   - l'en-tête, un code 404;
   - le corps, un message en format HTML valide du type :
     L'URL demandé n'existe pas.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
