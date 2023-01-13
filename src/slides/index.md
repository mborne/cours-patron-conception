
# Les patrons de conception

<br />

<div class="center">
    <img src="img/lego3-selection.jpg" />
</div>

---

# Introduction


---

## Pourquoi faire des efforts de conception?

Il faut avoir en tête **la seule constante du développement : Le changement !**

* Modification des fonctionnalités et modèles
* Changement de cible (desktop, serveur, cloud, mobile, etc.)
* Augmentation des volumes de données (parallélisation, etc.)
* Obsolescence des outils (bibliothèques, frameworks, etc.)
* Choix politique (base de données, opensource, etc.)
* ...

---

## Quels sont les critères qualités d'un programme?

Nous ciblerons (et on prioriserons) généralement plusieurs critères :

* **Fiabilité**       : Pouvoir faire tourner le programme sans risque de plantage
* **Maintenabilité**  : Pouvoir corriger un bug, mettre à jour les dépendances, etc.
* **Performance**     : Temps d'exécution, consommation de RAM, espace disque, etc.
* **Évolutivité**     : Pouvoir ajouter facilement des fonctionnalités sans risque de régression.
* **Réutilisabilité** : Pouvoir réutiliser un code dans un autre contexte.
* **Portabilité**     : Pouvoir porter facilement un programme développé pour une cible vers une autre.
* **Testabilité**     : Pouvoir automatiser facilement les tests unitaires et fonctionnels sur un programme.
* ...


---

## Les patrons de conception dans tout ça?

Pour bien en comprendre l'intérêt, nous allons d'abord balayer un ensemble de prérequis  :

* Rappel sur les bases de la P.O.O.
* Rappel sur les principes de conception

Nous verrons quelques mauvaises pratiques à travers les anti-patterns. Puis,
nous nous attarderons sur les bonnes pratiques en parcourant les design pattern.

---

# Plan

* Introduction
* Les bases de la P.O.O.
* Les principes de conception
* Les anti-patterns
* Les designs patterns
* Les patrons de création
* Les patrons de structure
* Les patrons de comportement
* Les patrons architecturaux
* A vous maintenant!
* Annexe
* Bibliographie

---

# Les bases de la P.O.O.

---

## Les concepts de base

* Les **classes** avec leurs **attributs** et leurs **méthodes**
* Les **constructeurs**
* Les **objets**
* La **visibilité** (public, private, protected)
* Les accesseurs (get, set, add, remove,...)
* Les **relations** (composition, agrégation)
* L'**héritage** et le **polymorphisme**
* Les méthodes et classes **abstraites**
* Les **interfaces**
* Les **méthodes statiques**
* Les **attributs statiques**

---

## Bien comprendre l'intérêt de ces concepts!

Généralement, ces concepts sont plutôt bien maîtrisés pour modéliser des données (objet de domaine).

Il faut toutefois bien **comprendre l'intérêt de ces concepts pour les exploiter efficacement** afin de faire varier efficacement le comportement d'un programme.

=> [Méditons quelques exemples](meditation.html).


---

## Les concepts avancés

Les langages ont leurs spécificités qui doivent être prises en compte dans la conception :

* Gestion de la mémoire (*Garbage collector*, notion de propriétaire d'une variable (Rust),...)
* *Property* (getter/setter "magiques")
* Introspection et réflexion
* Annotations
* Cohabitation de la P.O.O. avec d'autres paradigmes :
  * Programmation générique (`template`)
  * Programmation fonctionnelle (`.map`, `.filter`, `.reduce`,... avec éventuellement des coroutines et le mot clé `yield`)
* ...

Nous n'entrerons pas dans ce niveau de détail en nous concentrant sur les éléments applicables avec la plupart des langages disposant du concept de classe.

---

# Les principes de conception

Les patrons de conception que nous allons bientôt voir sont (entre autres) une
mise en pratique de principes de conception qui s'ajoutent aux principes
de base de la P.O.O. (abstraction, encapsulation, etc.) et qu'il faut avoir en tête.

---

## SOLID (1/2)

### (S)ingle Responsibility Principle

Une classe remplit une fonction et une seule.

### (O)pen Closed Principle

Une classe est ouverte à l’extension, mais fermée aux modifications.

---

## SOLID (2/2)

### (L)iskov Substitution Principle

Lorsqu’une classe se substitue à une autre, le programme continue de fonctionner.

### (I)nterface Segregation Principle

Préférer plusieurs interfaces spécifiques pour chaque client plutôt qu'une seule interface générale.

### (D)ependency Inversion Principle

Il faut dépendre des interfaces, pas des implémentations (classes concrètes).

---

## YAGNI : you ain't gonna need it

On ne code que ce qui est utile. On n'ajoute pas des codes en se disant que ça
servira un jour.

---

## DRY : Don't Repeat Yourself

Le copier/coller n'est pas une méthode acceptable de réutilisation des codes.

Quand on veut réutiliser un code, on le met en facteur.

---

## Identifier et encapsuler ce qui varie (1/2)

Cas d'école : J'identifie le besoin d'écrire mes logs dans la console
ou dans un fichier...

```java
class MaClasse {

    public void faireUnTruc(){
        System.out.println("Je fais un truc");
        // ...
    }

}
```

---

## Identifier et encapsuler ce qui varie (2/2)

... je fais abstraction sur l'écriture des logs en posant un concept à l'aide d'une classe `Logger` dédiée à l'écriture des logs :

```java
class MaClasse {

    private Logger logger ;

    public void faireUnTruc(){
        logger.info("Je fais un truc");
    }

}
```


---

## Préférer la composition à l'héritage

* Nous hériterons d'une classe seulement si nous pouvons dire "EST-UN" (ex : "un `Chien` est un `Animal`")
* Nous n'hériterons pas d'une classe dans le but de réutiliser ses méthodes
* Nous préférerons les états aux classes dérivées (ex : un `type` sur la classe `Animal` si rien ne je justifie une hiérarchie de type)
* Nous verrons en détail avec le patron [Strategy](annexe/design_pattern/behavior/Strategy.html) en quoi l'approche par composition est plus efficace pour faire varier le comportement d'un programme.

---

# Les anti-patterns

Avant de mettre un nom sur des modèles de conception, nous allons **mettre un nom sur des erreurs de conception courantes : Les anti-patterns !**

---

## Principe des anti-patterns

* Nommer des erreurs de conception classiques
* Faciliter l'identification des erreurs de conception

---

## Réinventer la roue carrée

Ne pas s'appuyer sur une solution existante.

---

## Programmation spaghetti

Le rôle des différents éléments du système n'est pas identifiable. Il est difficile de modifier une partie du code sans en altérer le fonctionnement.

---

## Objet divin

L'objet divin porte un trop grand nombre de responsabilités.

---

## Abstraction inverse

Un composant ne fournit pas les abstractions nécessaires, mais seulement les méthodes les plus compliquées.

Les abstractions sont développées dans les clients.

---

## Marteau doré

Avec un bon marteau, tous les problèmes sont des clous!

<div class="center">
    <img src="img/golden-hammer.jpg" alt="Marteau d'or" />
    <br />
    (Source
    <a href="http://www.engravingawardsgifts.com/">engravingawardsgifts.com</a>)
</div>

Un outil est placé comme solution à tous les problèmes. Il peut s'agir d'une bibliothèque, d'une base de données, d'une suite de logiciel, etc.

---

## Coulée de lave

Un code non finalisé est mis en production. Il n'est plus possible de le remanier.

Ce problème peut concerner aussi bien des bibliothèques que des API.

---

## Premature Optimisation (1/2)

"Premature optimization is the root of all evil" (Donald Knuth)

* Gaspillage d'énergie pour des gains médiocres (voire négatifs).
* Complexité rendant impossible les optimisations globales.
* Complexité mettant en péril la qualité du logiciel (stabilité, maintenabilité, portabilité, etc.)

Exemples :

* Optimiser le parcours séquentiel d'un tableau au point qu'il devient impossible d'exploiter un indexe spatial.
* "Je n'ai pas besoin des arcs entrants pour cet algorithme, je développe une classe dédiée pour ce graphe afin de consommer moins de mémoire!". Bilan : Le programme réel passe son temps à faire des copies de graphes.

---

## Premature Optimisation (2/2)

"Premature optimization is the root of all evil" (Donald Knuth) **mais :**

* Il ne faut pas en conclure que l'optimisation doit être ignorée dans la conception!
* Il faut rester prudent sur cette affirmation pour les bibliothèques de bas niveau!
* Parfois, on privilégie la performance à la portabilité.

Proposition de méthode :

* **Se concentrer sur les optimisations globales dans la conception** (choix de structures efficaces, indexations, gestion des caches, etc.).
* Coder en mettant en place des **tests** et des **mesures de performance** (*bench*).
* **Profiler** et réaliser les **optimisations locales sur les fonctions souvent appelées**.

---

# Les designs patterns

Nous y sommes! Alors, les patrons de conception, Quésako?

---

## Définition

Le concept de patron de conception a été défini par le « Gang of Four » (Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides) dans le livre "Design Patterns -- Elements of Reusable Object-Oriented Software" (1994).

Un design pattern est la description d'une solution réutilisable pour un problème de conception.

---

## Famille de patrons de conception du GoF

Le « Gang of Four » définit trois familles de patrons de conception :

* Les **patrons de création** (*creational patterns*) qui décrivent des **techniques d'initialisation des objets**.
* Les **patrons de structure** (*structural patterns*) qui décrivent des **organisations classiques de classes**.
* Les **patrons de comportement** (*behavioral patterns*) qui décrivent des méthodes de communications entre objets au sein d'une application.

---

## Autres familles de patrons de conception

Le concept sera étendu et nous trouverons en complément :

* Des patrons architecturaux qui traitent des styles d'architecture de logiciel (MVC, micro-service, etc.)
* Des familles de patrons spécifiques à des domaines d'application (cloud, big-data, etc.)
* Des familles de patrons spécifiques à des frameworks (spring, etc.)

---

## Formalisme des design patterns

* Un nom
* Un problème
* Une solution
* Des conséquences (avantages et inconvénients)

---

## Intérêts des design patterns (1/2)

* Utiliser un vocabulaire commun
* Trouver de l'inspiration dans la recherche d'une solution
* Uniformiser la conception (MVC, IoC, MQ, etc.)
* Faciliter la compréhension des codes

---

## Intérêts des design patterns (2/2)

En pratique, vous retrouverez plus facilement vos petits en Java et dans les frameworks orientés objet :

* Connaissance du vocabulaire commun (`*Builder`, `*Factory`, `*::getInstance`, `addChild`, etc.).
* Compréhension des architectures par identification des patterns.

Aussi, vous pourrez rechercher des solutions aux problèmes classiques que vous rencontrez :

* Comment faire un interpréteur?
* Comment faire un undo/redo?
* Est-ce qu'il y a un framework MVC pour ce langage?

---

# Les patrons de création

* [Singleton](annexe/design_pattern/creational/Singleton.html)
* [Prototype](annexe/design_pattern/creational/Prototype.html)
* [Factory (Fabrique)](annexe/design_pattern/creational/Factory.html)
* [FactoryMethod](annexe/design_pattern/creational/FactoryMethod.html)
* [Builder (Monteur)](annexe/design_pattern/creational/Builder.html)
* [AbstractFactory (Fabrique abstraite)](annexe/design_pattern/creational/AbstractFactory.html)

---

# Les patrons de structure

* [Facade (Façade)](annexe/design_pattern/structural/Facade.html)
* [Decorator (Décorateur)](annexe/design_pattern/structural/Decorator.html)
* [Composite (Objet composite)](annexe/design_pattern/structural/Composite.html)
* [Adapter (Adaptateur)](annexe/design_pattern/structural/Adapter.html)
* [Bridge (Pont)](annexe/design_pattern/structural/Bridge.html)
* Proxy
* Flyweight (Poids-mouche)

---

# Les patrons de comportement

* [Iterator (Itérateur)](annexe/design_pattern/behavior/Iterator.html)
* [Strategy (Stratégie)](annexe/design_pattern/behavior/Strategy.html)
* [Visitor (Visiteur)](annexe/design_pattern/behavior/Visitor.html)
* Chain of responsibility (Chaîne de responsabilité)
* Command (Commande)
* Interpreter (Interpréteur)
* Mediator (Médiateur)
* Memento (Mémento)
* [Observer (Observateur)](annexe/design_pattern/behavior/Observer.html)
* State (État)
* Template Method (Patron de méthode)

* [Null Object (objet null)](annexe/design_pattern/behavior/NullObject.html)


---

# Les patrons architecturaux

Quelques exemples :

* Architecture en couche
* Architecture micro-service
* [Model-View-Controller (MVC)](annexe/design_pattern/architectural/MVC.html)
* [Inversion de contrôle (IoC)](https://github.com/mborne/spring-ioc-principe)
* [MapReduce](annexe/design_pattern/architectural/MapReduce.html)
* Event-Driven architecture/Message Oriented Middleware (MOM)


---

# A vous maintenant!

---

## Comment progresser?

* Comprendre et apprendre les principaux patrons de conception

* Identifier les patrons de conception dans les codes existants : Rechercher les fabriques, les monteurs, les stratégies, les décorateurs, etc.

* Expérimenter!

* Concevoir des codes en pensant aux principes de conception et patrons de conception

* Concevoir des codes en les testant unitairement (un code mal conçu ne pouvant être testé unitairement)

* Comprendre des architectures existantes (vous constaterez que les mêmes principes s'appliquent à diverses échelles des systèmes)

---

# Annexe

* [TP - Mise en oeuvre des patterns sur des Geometry](annexe/tp-geometry/index.html)
* [Les grands principes du refactoring de code](refactoring.html)
* [TP - Réfactoring sur des traitements de graphe](annexe/tp-graph/index.html)
* [Outils pour la gestion des dépendances (Java, PHP, NodeJS, JavaScript, C++)](annexe/dependances.html)

---

# Bibliographie (1/2)

* Design Patterns: Elements of Reusable Object-Oriented Software (Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides)

* Tête la première dans les Design Patterns, O'Reilly

> Présente les patrons de conception à travers des problématiques concrètes. Le style d'écriture rend la lecture plus agréable que le parcours d'un catalogue.

* Design Patterns, Catalogue de modèles de conceptions réutilisables, Vuibert

* Microsoft Application Architecture Guide, 2nd Edition

> Disponible gratuitement au format PDF, ce guide initialement rédigé à l'attention des développeurs DotNet traite des problématiques générales sur l'architecture logicielle : Principes de conception, critères qualités, styles d'architecture, etc.

---

# Bibliographie  (2/2)

* [principles-wiki.net - OOD Principle Language](http://principles-wiki.net/collections:ood_principle_language)

> Catalogue de principes de conception.

* [java-design-patterns.com - Design patterns implemented in Java](https://java-design-patterns.com/)

> Implémentation de nombreux patrons de conception en java sur des exemples concrets et présentation des principes de conceptions (dépôt github disponible : https://github.com/iluwatar/java-design-patterns)

* [sourcemaking.com - Design Patterns](https://sourcemaking.com/design_patterns) et [AntiPatterns](https://sourcemaking.com/antipatterns)

> Catalogue des principaux patrons de conception (avec des exemples dans plusieurs langages) et anti-patrons (dans plusieurs domaines : développement, architecture et gestion de projet).

* [fr.wikibooks.org - WIKIBOOK, Patrons de conception/Patrons du *Gang of Four*](https://fr.wikibooks.org/wiki/Patrons_de_conception)

> Présentation des principaux patrons de conception

* [learn.microsoft.com - Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)

> Patron de conception de plus haut niveau pour le développement de services hébergés dans le *cloud*.

