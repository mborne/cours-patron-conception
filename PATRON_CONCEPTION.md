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
* Réutilisabilité
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
## Les anti-patterns
## Les designs patterns
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

* On comprend le rôle de ces outils
* On applique des règles de conception
* On met en place des conventions (organisation des codes, nommage : forme et terminologie)
* On applique des patrons de conception pour faciliter la compréhension de l'architecture

---

# Les principes de conception

Les patrons de conception que nous allons bientôt voir sont (entre autres) une 
mise en pratique de principes de conception qui s'ajoutent aux principes
de base de la P.O.O. (abstraction, encapsulation, etc.) et qu'il faut avoir en tête.

---

# Les principes de conception

## SOLID (1/2)

* (S)ingle Responsibility

Une classe remplit une fonction et une seule.

* (O)pen Closed

Une classe est ouverte à l’extension, mais fermée aux modifications. 

---

# Les principes de conception

## SOLID (2/2)

* (L)iskov Substitution Principle

Lorsqu’une classe se substitue à une autre, son contrat de fonctionnement est respecté.

* (I)nterface Segregation

Préférer plusieurs interfaces spécifiques pour chaque client plutôt qu'une seule interface générale.

* (D)ependency Inversion

Il faut dépendre des interfaces, pas des implémentations (classe concrète).

---

# Les principes de conception

## DRY : Don't Repeat Yourself

Le copier/coller n'est pas une méthode acceptable de réutilisation des codes. 

Quand on veut réutiliser un code, on le met en facteur.


## YAGNI : you ain't gonna need it

On ne code que ce qui est utile. On n'ajoute pas des codes en se disant que ça 
servira un jour.

---

# Les principes de conception

## Identifier et encapsuler ce qui varie (1/2)

Cas d'école : J'identifie le besoin d'écrire mes logs dans la console
ou dans un fichier...

```
class MaClasse {
    
    public void faireUnTruc(){
        System.out.println("Je fais un truc");
        // ...
    }
    
}
```

---

# Les principes de conception

## Identifier et encapsuler ce qui varie (2/2)

... je fais abstraction sur l'écriture des logs

```
class MaClasse {
    
    private Logger logger ;
    
    public void faireUnTruc(){
        logger.info("Je fais un truc");
    }
    
}
```


---

# Les principes de conception

## Préférer la composition à l'héritage

* On hérite d'une classe seulement si on peut dire "EST-UN"
* On n'hérite pas d'une classe dans le but de réutiliser ces méthodes!

Exemple d'erreur :

```
class Personne extends XMLDocument {
    
}
```

---

# Les anti-patterns

Avant de mettre un nom sur des modèles de conception, on va mettre un nom
sur des erreurs de conception courrantes : Les anti-pattern!

## Intérêt

* Identifier les erreurs de conception classique
* Mettre un nom sur le laid

(On admettra aussi une force rhétorique dans l'utilisation de ces termes pour couper
court à la défense de solution foireuse)

---

# Les anti-patterns

* Réinvention de la roue
* Programmation spaguettis
* Objet divin
* Abstraction inverse
* Marteau doré
* Coulée de lave


---

# Les designs patterns

On y est! Alors, les patrons de conception, Quésako? Qu'est-ce que ça nous 
apporte par rapport aux règles de conception?

---

# Les designs patterns

## Historique

Les patrons de conception ont été défini par le « Gang of Four » (Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides)

Attention : Il n'existe pas un nombre fini de patron de conception (vous pourrez définir vos patrons de conception)
---

# Les designs patterns

## Formalisme

* Un nom
* Un problème
* Une solution
* Des conséquences (avantages et inconvénients) 

---

# Les designs patterns

## Intérêts (1/2)

* Trouver de l'inspiration dans la recherche d'une solution
* Utiliser un vocabulaire commun
* Uniformiser la conception (MVC, IoC, MQ, etc.), donc faciliter la compréhension des codes

---

# Les designs patterns

## Intérêts (2/2)

En pratique, vous retrouverez plus facilement vos petits en Java et dans les frameworks orienté objet
une fois que vous connaîtrez le vocabulaire commun (```*Builder, *Factory, *::getInstance, addChild, etc.```)

Aussi, vous pourrez rechercher des solutions aux problèmes classiques que vous rencontrez :

* Comment faire un interpréteur?
* Comment faire un undo/redo?
* Est-ce qu'il y a un framework MVC pour ce langage?

Mieux : Vous utiliserez mieux les frameworks quand vous utiliserez pleinement les MVC, 
les événements, l'injection de dépendance, etc.

---

# Les designs patterns

## Famille de patrons de conception du GoF

TODO reprendre ces description

* Les patrons de création (creational patterns) qui décrivent des techniques
d'initialisation des objets.
* Les patrons de structure (structural patterns) qui décrivent des organisations 
classiques de classes
* Les patrons de comportement (behavioral patterns) qui décrivent des méthodes
de communications entre objet au sein d'une application.

## Autres familles 

* Patron de conception architecturaux qui traitent des styles d'architecture de logiciel
https://en.wikipedia.org/wiki/Architectural_pattern


---

# Les designs patterns

## Patron de création

* Singleton
* Prototype
* Factory (Fabrique)
* AbstractFactory (Fabrique abstraite)
* Builder (Monteur)

---

# Les designs patterns

## Patron de structure

* Decorator (Décorateur)
* Adapter (Adaptateur)
* Composite (Objet composite)
* Facade (Façade)
* Bridge (Pont)
* Proxy
* FlyWeigth (Poids-mouche)

---

# Les designs patterns

## Patron de comportement

* Chain of responsability (Chaîne de responsabilité)
* Command (Commande)
* Interpreter (Interpréteur)
* Iterator (Itérateur)
* Mediator (Médiateur)
* Memento (Mémento)
* Observer (Observateur)
* State (État)
* Strategy (Stratégie)
* Template Method (Patron de méthode)
* Visitor (Visiteur)

* Null Object (objet null)

---

# Les designs patterns

## Patron de conception architecturaux

Quelques exemples parmis tant d'autres :

* Model-View-Controller (MVC) (avec plusieurs variantes)
* Event-Driven architecture
* En couche
* Broker Pattern
* Peer-to-peer
* Pipeline (http://www.informit.com/articles/article.aspx?p=366887&seqNum=8)

Et des hordes de patterns en fonction des domaines : 

* Voir SOA patterns, http://soapatterns.org/ pour les patrons en lien avec
les architectures orientés services


---

# A vous maintenant!

Comment progresser?

* Comprendre et apprendre les principaux patrons de conception

* Identifier les patrons de conception dans les codes existants

Les framework sont truffés de patterns : Recherchez les fabriques, les monteurs, les stratégies, les décorateurs, etc.

* Concevoir des codes en pensant règle de conception et patron de conception

* Concevoir des codes en les testant unitairement (on ne peut pas tester des codes qui sont mal conçus)

---

# Bibliographie

* WIKIBOOK, Patrons de conception/Patrons du « Gang of Four »
https://fr.wikibooks.org/wiki/Patrons_de_conception/Patrons_du_%C2%AB_Gang_of_Four_%C2%BB

* Design Patterns, sourcemaking.com
https://sourcemaking.com/design_patterns


---

# Bibliographie

* Tête la première dans les Design Patterns

<img src="http://ecx.images-amazon.com/images/I/516XECZXY3L.jpg" />











