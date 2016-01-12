# Les patrons de conception

---

# Introduction

## Pourquoi faire des efforts de conception?

Il faut avoir en tête la seule constante du développement : Le changement!

En outre, il faut avoir en tête (et prioriser) des critères qualités :

* Fiabilité
* Maintenabilité
* Testabilité
* Performance
* Evolutivité
* ...

---

# Introduction

## Comment va-t'on procéder?

Ce cours ne sera pas un catalogue des patrons de conception, mais plutôt :

* Un rappel des principales règles de conception en P.O.O.
* La présentation d'erreur de conception en P.O.O. (anti-pattern)
* La présentation des principes et de l'intérêt des patrons de conception (design patterns)

Le but : 
* Vous donner des éléments pour progresser dans la conception de logiciel
* Vous faire comprendre l'intérêt des patrons de conception dans cette démarche

---

# Plan

## Les bases de la P.O.O.
## Les principes de conception
## Les designs patterns
## Les anti-patterns
## A vous maintenant!

---

# Les bases de la P.O.O.

## Les concepts de base

* Classe et objet
* Méthode et constructeur
* Encapsulation (getter, setter, visibilité)
* Abstraction

---

# Les bases de la P.O.O.

## Les concepts de base

Par rapport aux aggrégats de variables (struct), on dispose d'outils 
permettant d'assurer la cohérence des variables formant l'aggrégat

* Constructeurs : Fonction init que l'on est obligé d'appeler
* Getter/Setter : Protection des variables de l'aggrégat

---

# Les bases de la P.O.O.

## Les concepts "avancés"

* Les relations (composition, aggrégation)
* Polymorphisme et héritage
* Classe abstraite et interface

---

# Les bases de la P.O.O.

## Les concepts "avancés"

Avec les concepts avancés, on dispose aussi et surtout d'outils 
pour faire varier le comportement d'un programme en faisant varier les classes!


---

# Les bases de la P.O.O.

Méditons sur quelques exemples de code!

---

# Les bases de la P.O.O.

Attention : Ces concepts varient en fonction des langages! 

De plus, certains concepts ne sont pas présents dans tous les langages :

* Garbage collector
* Introspection et réflexion
* Programmation générique/template

---

# Les bases de la P.O.O.

Alors, comment fait-on pour s'y retrouver avec ces outils?

* Comprendre le rôle de ces outils
* Appliquer des règles de conception


---

# Les principes de conception

Les patrons de conception que nous allons bientôt voir sont (entre autres) une 
mise en pratique de principes de conception qu'il faut avoir en tête.

---

# Les principes de conception

## Abstraction

TODO

---

# Les principes de conception

## SOLID (1/2)

* Single Responsibility

Une classe remplit une fonction et une seule.

* Open Closed

Une classe est ouverte à l’extension, mais fermée aux modifications. 

---

# Les principes de conception

## SOLID (2/2)

* Liskov Substitution Principle

Lorsqu’une classe se substitue à une autre, son contrat de fonctionnement est respecté.

* Interface Segregation

On crée des interfaces séparées pour les différents contrats

* Dependency Inversion

Le contrat n’étant pas porté par le module contenant la classe qui l’implémente, mais par le 
module ayant besoin de cette classe, la dépendance est inversée par rapport au sens commun

---

# Les principes de conception

## Préférer la composition à l'héritage

* On hérite d'une classe seulement si on peut dire "EST-UN"
* On n'hérite pas d'une classe dans le but de réutiliser ces méthodes!


---

# Les designs patterns

On y est! Alors, les patrons de conception, Quésako?

## Définition

TODO : définition du larousse

## 

Plus vulgairement : Ce sont des agencements de classes et d'objets qui peuvent 
inspirer la conception d'un logiciel sur des problématiques qui ont déjà été rencontrée par d'autres.

## Historique

Gang of four

Attention : Il n'existe pas un nombre fini de patron de conception (vous pourrez définir vos patrons de conception)


---

# Les anti-patterns

* Identifier les erreurs de conception classique
* Mettre un nom sur le laid

(On admettra aussi une force rhétorique dans l'utilisation de ces termes pour couper
court à la défense de solution foireuse)

---

## A vous maintenant!

Comment progresser?

* Comprendre et apprendre les principaux patrons de conception

* Identifier les patrons de conception dans les codes existants

* Concevoir des codes en pensant règle de conception et patron de conception

* Concevoir des codes en les testant unitairement (on ne peut pas tester des codes qui sont mal conçus)












