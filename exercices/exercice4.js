/**
  NodeJS propose un module de base appelé DNS. Ce module contient un ensemble de
  méthodes pour travailler sur le DNS. DNS est le Système des Noms de Domaine
  (Domain Name System).

  Le module DNS est documenté ici : https://nodejs.org/dist/latest-v5.x/docs/api/dns.html

  Qu'est-ce que le DNS ?

  Sur un réseau Intranet (interne à une organisation) ou Internet (public), les
  cartes réseau des ordinateurs ont une adresse IP (Internet Protocol). Une
  adresse IP est une sorte de "numéro de téléphone" pour une carte réseau
  connectée à un réseau. Si votre ordinateur à plusieurs cartes réseau (wifi,
  cable, ...), qui sont toutes connectées à des réseaux, alors vous aurez
  plusieurs adresses IP. Une pour chaque carte réseau.

  Il existe 2 formats d'adresse IP :
    - IPv4 qui se compose de 32 bits représentés sous la forme de 4 nombres en
    décimal. Par exemple : 195.42.251.40 pour le site Internet de la fnac.
    - IPv6 qui se compose de 128 bits représentés sous la forme de 8 nombre en
    hexadécimal. Par exemple : 2a03:2880:2130:7f20:face:b00c:0:25de pour le site
    Internet de facebook.

  A l'heure actuelle, les réseaux utilisent encore majoritairement le système
  d'adresses IPv4. Pour connaître votre adresse IPv4 :
  - Sur Windows, sur le terminal on tape : ipconfig et on s'intéresse au champ
  "IPv4"
  - Sur MAC, sur le terminal on tape : ifconfig et on s'intéresse au dernier
  champ "inet"
  - Sur Linux, sur le terminal on tape : ifconfig et on s'intéresse au champ
  "inet adr"

  Tous les ordinateurs ont une adresse IPv4 spéciale : 127.0.0.1 . Il s'agit de
  la "boucle locale", c'est à dire l'adresse IPv4 d'un ordinateur pour lui-même.

  Pourtant quand on utilise son navigateur Internet on ne saisit généralement pas
  d'adresse IPv4 ou IPv6 pour envoyer un message sur le réseau. On écrit un mot
  en toute lettre. Par exemple : www.fnac.com pour interroger l'ordinateur sur
  lequel le site de la fnac est installé.

  En réalité, votre ordinateur va d'abord consulter un ou plusieurs "annuaires"
  pour obtenir l'adresse IPv4 correspondant au mot. Dans l'ordre :
  -  Il ouvre le fichier "hosts" sur son propre système de fichier. Ce fichier
     contient des correspondances entres noms de domaine et adresses IPv4.
      -> Sur Windows ce fichier est dans : C:\WINDOWS\system32\drivers\etc\hosts
      -> Sur Mac ce fichier est dans : /private/etc/hosts
      -> Sur Linux ce fichier est dans : /etc/hosts

  - Si le fichier "hosts" ne contient pas de correspondance IPv4 et nom de
  domaine, votre ordinateur va envoyer une demande à des ordinateurs sur
  lesquels se trouvent des serveurs DNS. Les serveurs DNS sont des annuaires
  contenant des correspondances entre adresses IPv4 et nom de domaine.
  Les adresses IPv4 de ces ordinateurs font partie de la configuration de vos
  cartes réseau.

  Sur un schéma en 3 étapes on pourrait représenter le mécanisme du DNS comme
  suit :

    1)
    mon PC ----> cherche www.fnac.com dans le fichier hosts
    mon PC <---- pas de correspondance dans le fichier hosts
    2)
    mon PC ----> demande à a.b.c.d.e : Qui est www.fnac.com ? ----> ordinateur avec serveur DNS à l'adresse a.b.c.d.e
    mon PC <---- répond je ne sais pas quelle est l'adresse IPv4 de www.fnac.com  <---- ordinateur avec serveur DNS à l'adresse a.b.c.d.e
    3)
    mon PC ----> demande à i.j.k.l.m : Qui est www.fnac.com ? ----> ordinateur avec serveur DNS à l'adresse i.j.k.l.m
    mon PC <---- répond www.fnac.com correspond à 195.42.251.40  <---- ordinateur avec serveur DNS à l'adresse i.j.k.l.m
    4)
    mon PC ----> envoie un message à 195.42.251.40 ----> ordinateur avec le site de la fnac installé dessus à l'adresse 195.42.251.40
    mon PC <---- répond avec le code HTML de la page d'accueil <---- ordinateur avec le site de la fnac installé dessus à l'adresse 195.42.251.40

  Pour savoir quelles sont les adresses IPv4 des serveurs DNS utilisés par vos
  ordinateurs vous pouvez taper dans votre terminal :
    -> Sur Windows : ipconfig /all et voir la rubrique serveurs DNS
    -> Sur Mac : networksetup -getdnsservers Wi-Fi ou networksetup -getdnsservers Ethernet
    -> Sur Linux : cat /etc/resolv.conf
**/


/**
  Exercice :

    1.
    Utilisez la méthode .getServers() du module DNS de Node JS pour afficher
    dans votre console la liste des adresses IPv4 de serveurs DNS qu'utilise
    votre ordinateur. Vérifiez qu'elle correspond bien à la liste obtenues à
    l'aide de la commande système proposée plus haut.
**/
const dns = require('dns')
const servers = dns.getServers()
console.log(servers)

// '2a01:cb04:4f5:8800:8ec5:b4ff:fe5e:440',
//  2a01:cb04:4f5:8800:38b2:449c:b346:3efc // comparaison via ipconfig
//   'fe80::8ec5:b4ff:fe5e:440',
//    fe80::8ec5:b4ff:fe5e:440%19  // comparaison via ipconfig
//   '192.168.1.1'
//    192.168.1.19  //comparaison via ipconfig
/**
    2.
    Utilisez la méthode .lookup() du module DNS de Node JS pour afficher dans
    votre console l'adresse IPv4 correspondant au nom de domaine www.fnac.com et
    vérifiez qu'elle correspond bien à celle que je vous donne plus haut.
**/

const options = {
  all:true,
}

const fnac = dns.lookup('fnac.com', options,(err, addresses)=>
console.log('adresses : %j', addresses));


/**
    3.
    - Demandez à votre voisin son adresse IPv4.
    - Modifiez votre fichier hosts pour associer un mot à son adresse IPv4.
    - Utilisez la méthode .lookup() du module DNS de Node JS pour vérifier que
      votre ordinateur arrive à retrouver l'adresse IPv4 correspondant à ce mot.

    ATTENTION : pour modifier le fichier hosts vous devez démarrer un éditeur de
    texte en tant que administrateur du système d'exploitation.
**/

/**
    4.
    Votre programme prend un nom en argument lors de son exécution. Votre
    programme affiche dans la console que ce nom correspond à une adresse IPv4
    si c'est le cas ou que ce nom ne correspond pas à une adresse IpV4.
    - Vous devez créer une fonction qui prend en argument un nom et qui vous
      indique dans la console si ce mot correspond à une adresse IPv4 ou pas.
    - Vous devez modulariser ce programme (votre fonction doit être dans un
      module secondaire).
**/
const fs = require('fs');
let fonctionModule = require('./exercice4-Module.js');

const filePath = "exercice4-Module.js";

fs.writeFile(filePath," nouveau module", (err) => {
  if (err) throw err;
  console.log(`erreur de création de fichier : ` + err)
})




fonctionModule.fonctionUrlDeportee(www.nervod.com);

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
