/*
  QUERY STRING : variable=valeur&autrevariable=autrevaleur&...

  Créer le serveur suivant :
  - L'URL "/login" permet d'obtenir un formulaire de connexion. Lorsque le
    serveur reçoit cet URL, il doit envoyer dans sa REPONSE HTTP un document HTML
    avec un formulaire.

  - Soumettre le formulaire de connexion consiste à envoyer une requête HTTP
    POST au serveur.

  - Si le serveur reçoit un login/pass valides, il créé un fichier de session
    contenant le login utilisateur et envoi le nom de ce fichier (en-tête de
    réponse HTTP : "Set-Cookie") au navigateur avec un document HTML indiquant
    que l'authentification est réussie.

  - Sinon le serveur envoi une réponse HTTP contenant document HTML avec le
  formulaire de connexion contenant un message invitant l'utilisateur à
  re-essayer.

  - L'URL "/login" doit afficher un message du type :
    "Vous êtes déjà authentifié"
    si l'utilisateur envoi une requête HTTP contenant un identifiant de session
    (en-tête de requête HTTP : "Cookie") qui existe déjà.

  - L'URL "/profil" doit permettre d'obtenir un document HTML sur lequel on
  trouvera la mention : "Bienvenue X" où X est le login de l'utilisateur obtenu
  suite à la lecture du fichier de session.

  - Si le fichier de session n'existe pas l'URL "/profil" doit retourner un
  status HTTP de type 403 Not Authorized.
*/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
