/*
  Créer une base de données blog dans MongoDB et une collection articles
  contenant des documents avec les propriétés : titre, auteur, corps, date de
  publication

  Créer une application Node qui utilise le module mongodb (voir sur npm) avec :

  -> une route / ou /index :
      - Elle permet d'obtenir un document HTML contenant l'ensemble des articles
      de la collection articles de la base de données.

  -> une route /voir/[titre] où [titre] est le titre d'un article :
      - Elle permet d'obtenir un document HTML présentant l'article dont le
      titre correspond à l'URL. L'article est obtenu à partir de la collection
      articles de la base de données.

      - Si aucune article avec ce titre n'est trouvé, le document HTML obtenu
      est une erreur 404.

  -> une route /ajouter :
      - En GET, elle permet d'obtenir un document HTML contenant un formulaire
      de saisie d'article.
      - En POST, elle permet d'envoyer un article au serveur pour l'INSERER
      dans la collection articles de la base de données blog de mongodb ET
      d'obtenir un document HTML indiquant que la sauvegarde de l'article a été
      effectuée.

  -> une route /modifier/[titre] où [titre] est le titre d'un article :
      - En GET, elle permet d'obtenir un document HTML contenant un formulaire
      de saisie d'article contenant l'article dont le titre correspond à l'URL.
      - En POST, elle permet d'envoyer un article au serveur pour le METTRE A
      JOUR dans la collection articles de la base de données blog de mongodb ET
      d'obtenir un document HTML indiquant que la mise à jour de l'article a
      été effectuée.
      - Si aucune article avec ce titre n'est trouvé, le document HTML obtenu
      est une erreur 404.

  -> une route /supprimer/[titre] où [titre] est le titre d'un article :
       -Elle permet de supprimer l'article dont le titre correspond à l'URL dans
       la collection articles de la base de données blog de mongodb ET d'obtenir
       un document HTML indiquant que la suppression de l'article a été
       effectuée.
      - Si aucune article avec ce titre n'est trouvé, le document HTML obtenu
      est une erreur 404.
*/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
