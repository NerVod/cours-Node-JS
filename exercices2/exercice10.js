/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 192.168.104.15
   - Port : 80
   - Ressource : /formulaire.html
   - Query String : date=2015-09-01

   Donne l'URL : http://192.168.104.15:80/formulaire.html?date=2015-09-01
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Modifiez le formulaire de l'exercice précédent en changeant :
  - method="GET" par method="POST"

  Vérifiez que lorsque vous soumettez votre formulaire, la Query String
  n'apparaît plus dans l'URL.
**/

/************************************************************************************************************
  Lorsqu'on spécifie method="POST" sur un formulaire, le navigateur Internet
  produit des requêtes HTTP pour lesquelles la Query String n'apparaît plus dans
  l'URL et donc dans l'en-tête de la requête HTTP, mais dans le corps de la
  requête HTTP. Illustration :

  Méthode GET :
                                        ______________
                                       |   En-têtes   |
                                       |   URL avec   |
                                       | Query String |
  Navigateur Internet --> Requête HTTP |   + autres   | --> Serveur HTTP
                                       |______________|
                                       |  Corps vide  |
                                       |______________|

  Méthode POST :
                                        ______________
                                       |   En-têtes   |
                                       |   URL avec   |
  Navigateur Internet --> Requête HTTP | autres infos | --> Serveur HTTP
                                       |______________|
                                       |    Corps     |
                                       | Query String |
                                       |______________|

  Donc coté serveur, si on souhaite récupérer la Query String, il faut lire le
  corps de la requête HTTP.

  Quel est l'intérêt ? Un URL est limité à 2048 caractères. Le corps de la
  requête n'a pas de limite de taille.
******************************************************************************************************************/

/**
  2. Créez un fichier HTML traitement.html dans lequel vous positionnerez trois
  chaînes de caractères facilement reconnaissables. Par exemple :
  - {{ titre }}
  - {{ description }}
  - {{ date }}

  Après avoir lu et obtenu le contenu du fichier traitement.html et avant de
  retourner la réponse HTTP, votre serveur HTTP doit remplacer dans le contenu
  du fichier les 3 chaînes de caractères par, respectivement, le titre, la
  description et la date provenants de la Query String contenue dans le CORPS de la
  requête HTTP.

  Pour récupérer le contenu du corps de la requête HTTP :

  Les objets de type http.IncomingMessage qui représentent une requête HTTP héritent
  d'un objet de type ReadableStream documenté ici :
    https://nodejs.org/api/stream.html#stream_class_stream_readable.
  Et les objets de type ReadableStream héritent d'un objet de type EventEmitter.

  Un objet de type http.IncomingMessage possède donc les évènements 'data' et
  'end' de l'objet ReadableStream.
  - 'data' : est l'évènement qui se déclenche une ou plusieurs fois au fur et à
    mesure que le serveur HTTP télécharge le corps de la requête envoyée par
    le navigateur Internet.
  - 'end' : est l'évènement qui se déclenche quand serveur HTTP à reçu la
    totalité du corps de la requête.

  Pour récupérer la Query String on doit donc utiliser l'évènement 'data' pour
  reconstruire progressivement la Query String et, à la fin du téléchargement de
  la Query String, déclencher les instructions souhaitées.

  Exemple :

  ...
  let queryString = ``; //variable dans laquelle sera stockée progressivement la query string

  requeteHTTP.on('data', function(morceauDeQueryString){
    // Cette fonction est exécutée par Node JS à plusieurs reprises
    // avec, à chaque fois, en paramètre une partie de la Query String
    // jusqu'à ce que la totalité des morceaux de cette dernière aient
    // été téléchargés.
    queryString += morceauDeQueryString;
  });

  requeteHTTP.on('end', function(){
    //Cette fonction est exécutée par Node JS une seule fois quand
    //le corps de la requête à été totalement téléchargé.
    queryString; //Ici on peut considérer que la variable queryString contient la totalité du corps de la requête.

  });

  ...

  Pour manipuler facilement la query string, on utilisera le module URLSearchParams de Node JS documenté ici :
    https://nodejs.org/api/url.html#class-urlsearchparams
  Elle permet, à partir d'une URL, de créer un objet contenant les paramètres de query string.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
