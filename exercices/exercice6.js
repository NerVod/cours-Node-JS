/**
  NodeJS propose un module de base appelé HTTP. Ce module contient un ensemble
  de méthodes pour créer un serveur HTTP.

  Ce module est documenté ici :
    https://nodejs.org/api/http.html

  Qu'est-ce que le HTTP ?

  Le HTTP est le protocole (règles de communication) qui régit les échanges
  entre un logiciel client HTTP (comme un navigateur Internet) et un logiciel
  serveur HTTP.

  -> Le rôle du client HTTP est d'envoyer une REQUETE HTTP.
  -> Le rôle du serveur HTTP est d'envoyer une REPONSE HTTP suite à une requête
     HTTP.

  Une REQUETE HTTP est un texte. Que contient ce texte :
  -> Des en-têtes avec, par exemple, des informations concernant le navigateur
     Internet qui a émis la requête HTTP séparées par des sauts de ligne.
  -> Des données généralement présentée sous la forme d'une chaîne de caractères
     ("query string") structurée comme suit :
     variable=valeur&autrevariable=valeur

  Une REPONSE HTTP est un texte. Ce texte contient :
  -> Des en-têtes avec, par exemple, des informations concernant le serveur HTTP
  qui a émis la réponse HTTP séparées par des sauts de ligne.

  -> Des données généralement présentées sous la forme d'une chaîne de caractères
  comme par exemple du code HTML : <!doctype html><html lang="fr"><head><meta...

  Comment produire une REQUETE HTTP ?
  -> On saisit un URL dans la barre d'adresse du navigateur Internet et on
     valide. Le navigateur Internet se charge alors de construire et d'envoyer
     la requête HTTP appropriée.
  -> On clique sur un lien affiché sur un document Web dans un navigateur
     Internet. Le navigateur Internet se charge alors de construire et d'envoyer
     la requête HTTP appropriée.
  -> On soumet un formulaire affiché sur un document Web dans un navigateur
     Internet. Le navigateur Internet se charge alors de construire et d'envoyer
     la requête HTTP appropriée.
  -> On appuie sur un des liens de favoris, on clique sur précédent ou suivant
     sur un navigateur Internet. Le navigateur Internet se charge alors de
     construire et d'envoyer la requête HTTP appropriée.

  Comment produire une REPONSE HTTP en réponse à une requête HTTP ?
  -> On crée un logiciel serveur qui va construire et envoyer la réponse HTTP
  appropriée !

  Passez à la série suivante d'exercices.
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
