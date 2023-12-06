
## Les patrons de conception

<br />

<div class="center">
    <img src="img/lego3-selection.jpg" />
</div>

---

## Plan

* Introduction
* Les bases de la P.O.O.
* Les principes de conception
* Les anti-patrons
* Les designs patterns
* Les patrons de création
* Les patrons de structure
* Les patrons de comportement
* A vous maintenant!
* Les patrons architecturaux
* Le refactoring
* Annexes et références

---

## Introduction

---

### Pourquoi faire des efforts de conception?

Il faut avoir en tête **la seule constante du développement : Le changement !**

De nombreux événements conduiront à modifier le code d'une application :

* Modification des fonctionnalités et modèles
* Changement de cible (desktop, serveur, cloud, mobile, etc.)
* Augmentation du nombre d'utilisateurs et des volumes de données (parallélisation, etc.)
* Obsolescence des outils (bibliothèques, frameworks, etc.)
* Choix politique (base de données, opensource, etc.)
* ...

**Sans effort de conception, plus le temps passera, plus il sera difficile, coûteux et risqué de traiter ces changements**.

---

### Quels sont les critères qualités d'un programme?

Il conviendra de **cibler plusieurs critères qualités qui guideront la conception** :

* **Fiabilité**       : Pouvoir faire tourner le programme sans risque de plantage
* **Maintenabilité**  : Pouvoir corriger un bug, mettre à jour les dépendances, etc.
* **Performance**     : Temps d'exécution, consommation de RAM, espace disque, etc.
* **Évolutivité**     : Pouvoir ajouter facilement des fonctionnalités sans risque de régression.
* **Réutilisabilité** : Pouvoir réutiliser un code dans un autre contexte.
* **Portabilité**     : Pouvoir porter facilement un programme développé pour une cible vers une autre.
* **Testabilité**     : Pouvoir automatiser facilement les tests unitaires et fonctionnels sur un programme.
* ...

Nous serons souvent amené à **prioriser ces critères** (ex : privilégier les performances plutôt que la généricité)

---

### Les patrons de conception dans tout ça?

Pour bien l'**intérêt des patrons de conception**, nous allons d'abord balayer un ensemble de **prérequis**  :

* **Les concept de base de la P.O.O.**
* **Les principes de conception**

Nous verrons quelques **mauvaises pratiques** à travers les **anti-patrons**. Puis,
nous nous attarderons sur les **bonnes pratiques** avec les **patrons de conception**.

---

## Les bases de la P.O.O.

### Les concepts de base de la P.O.O.

Les concepts suivants sont normalement connus avant de débuter ce cours :

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

## Les bases de la P.O.O.

### Bien comprendre l'intérêt des concepts de base

Les concepts de classe, d'attribut et l'héritage sont généralement bien maîtrisés pour modéliser des données (objet de domaine).

Il convient toutefois de **bien comprendre l'intérêt des autres concepts de la P.O.O.** pour :

* Se protéger contre des erreurs de programmation
* S'assurer d'être en mesure de modifier le code sans casser les appels 
* S'assurer de pouvoir le comportement d'un programme en modélisant les traitements 
* ...

=> [Méditons quelques exemples](meditation.md).


---

## Les bases de la P.O.O.

### Les concepts avancés

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

## Les principes de conception

Les patrons de conception que nous allons bientôt voir sont (entre autres) une
mise en pratique de principes de conception qui s'ajoutent aux principes
de base de la P.O.O. (abstraction, encapsulation, etc.) et qu'il faut avoir en tête.

---

## Les principes de conception

### SOLID (1/2)

#### (S)ingle Responsibility Principle

Une classe remplit une fonction et une seule.

#### (O)pen Closed Principle

Une classe est ouverte à l’extension, mais fermée aux modifications.

---

## Les principes de conception

### SOLID (2/2)

#### (L)iskov Substitution Principle

Lorsqu’une classe se substitue à une autre, le programme continue de fonctionner.

#### (I)nterface Segregation Principle

Préférer plusieurs interfaces spécifiques pour chaque client plutôt qu'une seule interface générale.

#### (D)ependency Inversion Principle

Il faut dépendre des interfaces, pas des implémentations (classes concrètes).

---

## Les principes de conception

### YAGNI : you ain't gonna need it

On ne code que ce qui est utile. On n'ajoute pas des codes en se disant que ça
servira un jour.

---

## Les principes de conception

### DRY : Don't Repeat Yourself

Le copier/coller n'est pas une méthode acceptable de réutilisation des codes.

Quand on veut réutiliser un code, on le met en facteur.

---

## Les principes de conception

### Identifier et encapsuler ce qui varie (1/2)

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

## Les principes de conception

### Identifier et encapsuler ce qui varie (2/2)

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

## Les principes de conception

### Préférer la composition à l'héritage

* Nous hériterons d'une classe seulement si nous pouvons dire "EST-UN" (ex : "un `Chien` est un `Animal`")
* Nous n'hériterons pas d'une classe dans le but de réutiliser ses méthodes
* Nous préférerons les états aux classes dérivées (ex : un `type` sur la classe `Animal` si rien ne je justifie une hiérarchie de type)
* Nous verrons en détail avec le patron [Strategy](annexe/design_pattern/behavior/Strategy.html) en quoi l'approche par composition est plus efficace pour faire varier le comportement d'un programme.

---

## Les anti-patrons

Avant de mettre un nom sur des modèles de conception, nous allons **mettre un nom sur des erreurs de conception courantes : Les anti-patrons !**

---

## Les anti-patrons

### Principe des anti-patrons

* Nommer des erreurs de conception classiques
* Faciliter l'identification des erreurs de conception

---

## Les anti-patrons

### Réinventer la roue carrée

Ne pas s'appuyer sur une solution existante.

---

## Les anti-patrons

### Programmation spaghetti

Le rôle des différents éléments du système n'est pas identifiable. Il est difficile de modifier une partie du code sans en altérer le fonctionnement.

---

## Les anti-patrons

### Objet divin

L'objet divin porte un trop grand nombre de responsabilités.

---

## Les anti-patrons

### Abstraction inverse

Un composant ne fournit pas les abstractions nécessaires, mais seulement les méthodes les plus compliquées.

Les abstractions sont développées dans les clients.

---

## Les anti-patrons

### Marteau doré

Avec un bon marteau, tous les problèmes sont des clous!

<div class="center">
    <img src="img/golden-hammer.jpg" alt="Marteau d'or" />
    <br />
    (Source
    <a href="http://www.engravingawardsgifts.com/">engravingawardsgifts.com</a>)
</div>

Un outil est placé comme solution à tous les problèmes. Il peut s'agir d'une bibliothèque, d'une base de données, d'une suite de logiciel, etc.

---

## Les anti-patrons

### Coulée de lave

Un code non finalisé est mis en production. Il n'est plus possible de le remanier.

Ce problème peut concerner aussi bien des bibliothèques que des API.

---

## Les anti-patrons

### Premature Optimisation (1/2)

"Premature optimization is the root of all evil" (Donald Knuth)

* Gaspillage d'énergie pour des gains médiocres (voire négatifs).
* Complexité rendant impossible les optimisations globales.
* Complexité mettant en péril la qualité du logiciel (stabilité, maintenabilité, portabilité, etc.)

Exemples :

* Optimiser le parcours séquentiel d'un tableau au point qu'il devient impossible d'exploiter un indexe spatial.
* "Je n'ai pas besoin des arcs entrants pour cet algorithme, je développe une classe dédiée pour ce graphe afin de consommer moins de mémoire!". Bilan : Le programme réel passe son temps à faire des copies de graphes.

---

## Les anti-patrons

### Premature Optimisation (2/2)

"Premature optimization is the root of all evil" (Donald Knuth) **mais :**

* Il ne faut pas en conclure que l'optimisation doit être ignorée dans la conception!
* Il faut rester prudent sur cette affirmation pour les bibliothèques de bas niveau!
* Parfois, on privilégie la performance à la portabilité.

Proposition de méthode :

* **Se concentrer sur les optimisations globales dans la conception** (choix de structures efficaces, indexations, gestion des caches, etc.).
* Coder en mettant en place des **tests** et des **mesures de performance** (*bench*).
* **Profiler** et réaliser les **optimisations locales sur les fonctions souvent appelées**.

---

## Les patrons de conception

Nous y sommes! Alors, les patrons de conception, Quésako?

---

## Les patrons de conception

### Définition

Le concept de patron de conception a été défini par le « Gang of Four » (Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides) dans le livre "Design Patterns -- Elements of Reusable Object-Oriented Software" (1994).

Un design pattern est la description d'une solution réutilisable pour un problème de conception.

---

## Les patrons de conception

### Famille de patrons de conception du GoF

Le « Gang of Four » définit trois familles de patrons de conception :

* Les **patrons de création** (*creational patterns*) qui décrivent des **techniques d'initialisation des objets**.
* Les **patrons de structure** (*structural patterns*) qui décrivent des **organisations classiques de classes**.
* Les **patrons de comportement** (*behavioral patterns*) qui décrivent des méthodes de communications entre objets au sein d'une application.

---

## Les patrons de conception

### Autres familles de patrons de conception

Le concept sera étendu et nous trouverons en complément :

* Des patrons architecturaux qui traitent des styles d'architecture de logiciel (MVC, micro-service, etc.)
* Des familles de patrons spécifiques à des domaines d'application (cloud, big-data, etc.)
* Des familles de patrons spécifiques à des frameworks (spring, etc.)

---

## Les patrons de conception

### Formalisme des design patterns

* Un nom
* Un problème
* Une solution
* Des conséquences (avantages et inconvénients)

---

## Les patrons de conception

### Intérêts des design patterns (1/2)

* Utiliser un vocabulaire commun
* Trouver de l'inspiration dans la recherche d'une solution
* Uniformiser la conception (MVC, IoC, MQ, etc.)
* Faciliter la compréhension des codes

---

## Les patrons de conception

### Intérêts des design patterns (2/2)

En pratique, vous retrouverez plus facilement vos petits en Java et dans les frameworks orientés objet :

* Connaissance du vocabulaire commun (`*Builder`, `*Factory`, `*::getInstance`, `addChild`, etc.).
* Compréhension des architectures par identification des patterns.

Aussi, vous pourrez rechercher des solutions aux problèmes classiques que vous rencontrez :

* Comment faire un interpréteur?
* Comment faire un undo/redo?
* Est-ce qu'il y a un framework MVC pour ce langage?

---

## Les patrons de création

* [Singleton](annexe/design_pattern/creational/Singleton.html)
* [Prototype](annexe/design_pattern/creational/Prototype.html)
* [Factory (Fabrique)](annexe/design_pattern/creational/Factory.html)
* [FactoryMethod](annexe/design_pattern/creational/FactoryMethod.html)
* [Builder (Monteur)](annexe/design_pattern/creational/Builder.html)
* [AbstractFactory (Fabrique abstraite)](annexe/design_pattern/creational/AbstractFactory.html)

---

## Les patrons de structure

* [Facade (Façade)](annexe/design_pattern/structural/Facade.html)
* [Decorator (Décorateur)](annexe/design_pattern/structural/Decorator.html)
* [Composite (Objet composite)](annexe/design_pattern/structural/Composite.html)
* [Adapter (Adaptateur)](annexe/design_pattern/structural/Adapter.html)
* [Bridge (Pont)](annexe/design_pattern/structural/Bridge.html)
* Proxy
* Flyweight (Poids-mouche)

---

## Les patrons de comportement

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

## A vous maintenant!

Pour bien comprendre l'intérêt des patrons de conception, nous allons traiter le [TP - Mise en oeuvre des patterns sur des Geometry](annexe/tp-geometry/index.html)

---

## Les patrons architecturaux

Nous avons vu jusque là des patrons de conception à l'échelle de quelques classes. Nous soulignerons l'existence de **patron de conception architecturaux** agissant à l'**échelle d'une application ou d'un système** :

* [Architecture en couches](annexe/design_pattern/architectural/couches.html)
* Architecture micro-service
* [Model-View-Controller (MVC)](annexe/design_pattern/architectural/MVC.html)
* [Inversion de contrôle (IoC)](https://github.com/mborne/spring-ioc-principe#readme)
* [MapReduce](annexe/design_pattern/architectural/MapReduce.html)
* Event-Driven architecture/Message Oriented Middleware (MOM)

> Nous verrons dans le prochain TP que [Spring](https://spring.io/) combine l'utilisation de [Inversion de contrôle (IoC)](https://github.com/mborne/spring-ioc-principe#readme) et [Model-View-Controller (MVC)](annexe/design_pattern/architectural/MVC.html).

---

## Le refactoring

Nous noterons que souvent, nous serons face à des applications existantes où il sera potentiellement intéressant de **se mettre en conformité avec des principes de conception** et d'**introduire des patrons de conception**.

Nous verrons rapidement [les grands principes du refactoring de code](refactoring.md) avant de traiter le [TP - Réfactoring sur des traitements de graphe](annexe/tp-graph/index.html) où l'idée est de faire une mise en situation d'optimisation et d'industrialisation d'un code existant.

---

### Comment progresser?

* Comprendre et apprendre les principaux patrons de conception
* **Identifier les patrons de conception dans les codes existants** (rechercher les fabriques, les monteurs, les stratégies, les décorateurs, etc.)
* **Expérimenter!**
* **Concevoir** des codes en pensant aux **principes de conception** et **patrons de conception** (sans sombrer dans la paternite)
* **Concevoir des codes en les testant unitairement** (un code mal conçu ne pouvant être testé unitairement)
* **Comprendre des architectures existantes** (vous constaterez que les mêmes principes s'appliquent à diverses échelles des systèmes)

---

## Annexes et références

Voir [annexes](annexe/).
