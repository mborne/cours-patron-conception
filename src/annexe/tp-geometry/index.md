# TP - Mise en oeuvre des patterns sur des Geometry

[[toc]]

## Introduction

L'objectif de ce TP est de s'exercer à mettre oeuvre des patrons de conception via la création d'une petite bibliothèque de manipulation des géométries OGC :

![Géométrie OGC](schema/geometries-light.png)

## Mise en garde

Dans la vraie vie :

* Vous utiliserez plutôt des bibliothèques du type [JTS](https://locationtech.github.io/jts/javadoc/index.html).
* Les patrons de conception ne seront pas la solution à tous les problèmes et nous n'en n'utiliserons pas autant.

## Démarrage

* Cloner le projet https://github.com/mborne/tp-pattern-geometry

```bash
mkdir ~/workspace_pattern
cd ~/workspace_pattern
git clone https://github.com/mborne/tp-pattern-geometry.git
cd tp-pattern-geometry
# vérifier que vous êtes bien sur la branche "initial"
git branch
```

* Importer le projet maven dans eclipse ou votre IDE préféré

(Au besoin, voir [Configuration eclipse/maven avec un proxy](https://github.com/mborne/maven-eclipse#configuration-eclipsemaven-avec-un-proxy))


## 0.1 - Coordinate (2D)

> Objectif : Préparation du TP, principe de base, encapsulation

Créer une classe `Coordinate` permettant de représenter une position en 2D à l'aide d'un couple x,y :

![Schéma UML](schema/mcd-01.png)

Nous soulignerons que :

* Cette classe est immuable (**une fois construite, une coordonnée ne peut être modifiée**)
* Le constructeur par défaut initialisera une coordonnée vide matérialisée par `x=Double.NaN` et `y=Double.NaN`
* `isEmpty()` permettra de tester si une coordonnée est vide.
* `toString()` renverra un tableau au format JSON (`[3.0,4.0]`, `[NaN,NaN]`)

Exemple d'utilisation :

```java
public class CoordinateTest {

    public static final double EPSILON = 1.0e-15;

    @Test
    public void testCoordinateXY() {
        Coordinate c = new Coordinate(3.0, 4.0);
        assertEquals(3.0, c.getX(), EPSILON);
        assertEquals(4.0, c.getY(), EPSILON);
        assertFalse(c.isEmpty());
        assertEquals("[3.0,4.0]", c.toString());
    }

}
```

## 0.2 - Geometry, Point et LineString

> Objectif : Préparation du TP, utilisation d'interface, encapsulation

Implémenter les trois classes suivantes illustrées sur le schémas ci-après :

![Schéma UML](schema/mcd-02.png)

Remarques :

* `getType()` renverra le nom de la classe en *CamelCase* (`"Point"` ou `"LineString"`)
* Nous nous interdirons de modifier ce comportement dans les questions suivantes (~~`"POINT"`~~, ~~`"LINESTRING"`~~).


## 0.3 - Geometry.isEmpty()

> Objectif : Bonne pratique *NonNullObject*

Dans la question précédente, nous remarquons que nous avons des choix à faire dans les constructeurs par défaut de `Point` et `LineString`.

Afin d'éviter d'avoir à tester des `coordinate` ou `points` null, nous allons ajouter le **concept de géométrie vide** :

* S'assurer que la variable membre `coordinate` de `Point` n'est jamais nulle.
* S'assurer que la variable membre `points` de `LineString` n'est jamais nulle (une liste vide est préférable à une valeur nulle).
* Déclarer `Geometry.isEmpty` et l'implémenter dans `Point` et `LineString`

![Schéma UML](schema/mcd-03.png)


## 0.4 - Geometry.translate(dx,dy)

> Objectif : Exploiter une interface pour réaliser un traitement spécifique

Ajouter une méthode de permettant de translater une géométrie.

![Schéma UML](schema/mcd-04.png)

Remarque : Vous serez amené à créer une nouvelle `Coordinate` pour l'implémentation dans `Point`.

## 0.5 - Geometry.clone()

> Objectif : Patron de conception *Prototype*

En introduisant la fonction précédente, nous avons renoncé à l'idée d'avoir des géométries immuable (non modifiable après construction).

Nous allons donc ajouter une méthode `clone()` permettant de récupérer une copie d'une géométrie :

![Schéma UML](schema/mcd-05.png)

Exemple d'utilisation :

```java
Geometry copy = g.clone();
copy.translate(10.0,10.0);
//... "g" n'est pas modifiée
```

Remarques :

* Sans `clone()`, un traitement particulier serait nécessaire pour copier un `Point`, une `LineString`, etc.
* Nous procéderons à une **copie en profondeur** pour les seules propriétés immuables.


## 0.6 - Envelope et EnvelopeBuilder

> Objectif : Patron de conception Builder

Nous souhaitons calculer l'emprise d'une géométrie (la bbox). La logique de calcul de min/max en oeuvre étant assez complexe, nous ne souhaitons pas l'implémenter dans les classes `Point` et `LineString`.

Nous allons donc procéder comme suit :

* Ajouter une classe `Envelope` représentant une emprise rectangulaire de la géométrie
* Ajouter une classe utilitaire `EnvelopeBuilder` qui aura pour rôle de construire cette emprise

![Schéma UML](schema/mcd-06.png)

Exemple d'utilisation :

```java
EnvelopeBuilder builder = new EnvelopeBuilder();
builder.insert(new Coordinate(0.0,1.0));
builder.insert(new Coordinate(2.0,0.0));
builder.insert(new Coordinate(1.0,3.0));
Envelope result = builder.build();
```

Remarques : 

* Vous avez la **liberté d'ajouter des variables membres privées** dans `EnvelopeBuilder` pour le calcul.
* En cas de difficulté pour faire des calculs de min/max optimaux, vous pouvez par exemple vous appuyer sur deux variables privées `xVals: List<Double>` et `yVals: List<Double>` pour exploiter les fonctionnalités standards java :

```java
List<Double> xVals = new ArrayList<Double>();
xVals.add(1.0);
xVals.add(-1.0);
xVals.add(3.0);
double xmin = Collections.min(xVals);
double xmax = Collections.max(xVals);
Assert.assertEquals(-1.0,xmin,EPSILON);
Assert.assertEquals(3.0,xmax,EPSILON);
```

Cette approche ne sera pas "optimale", mais elle peut être un premier jet permettant la mise en oeuvre des tests avant optimisation.

## 0.7 - Geometry.getEnvelope() : Envelope

> Objectif : Facade sur EnvelopeBuilder

Ajouter une méthode utilitaire sur `Geometry` pour récupérer facilement l'enveloppe comme suit :

* Déclarer une méthode `getEnvelope` dans `Geometry`
* Implémenter cette méthode dans `Point` et `LineString` à l'aide de `EnvelopeBuilder`

![Schéma UML](schema/mcd-07.png)

## 0.8 - WktWriter

> Objectif : Mesurer l'intérêt d'une conception propre et de GeometryVisitor dans les questions suivantes

Ajouter une classe `WktWriter` avec une méthode permettant de convertir une géométrie au [format WKT](https://fr.wikipedia.org/wiki/Well-known_text) qui prendra par exemple les formes suivantes :

```
POINT EMPTY
POINT(3.0 4.0)
LINESTRING EMPTY
LINESTRING(0.0 0.0,1.0 1.0,5.0 5.0)
```


![Schéma UML](schema/mcd-08.png)

Exemple d'utilisation :

```java
Geometry g = new Point(new Coordinate(3.0,4.0));
WktWriter writer = new WktWriter();
assertEquals("POINT(3.0 4.0)", writer.write(g));
```

Remarques :

* On s'interdira de modifier les classes `Geometry`, `Point` et `LineString` pour mettre en oeuvre cette fonctionnalité.
* On s'autorisera l'utilisation d'un fragment de code ressemblant à ceci pour traiter les différents types concrets :

```java
if ( geometry instanceof Point ){
    Point point = (Point)geometry;
    // traiter le cas Point
}else if ( geometry instanceof LineString ){
    LineString lineString = (LineString)geometry;
    // traiter le cas LineString
}else{
    throw new RuntimeException("geometry type not supported");
}
```

## 0.9 - GeometryVisitor

> Objectif : Patron de conception Visitor, prise en main

* Ajouter l'interface `GeometryVisitor`
* Implémenter un visiteur `LogGeometryVisitor` qui affiche la géométrie dans la console sous les formes suivantes :
    * "Je suis un point vide."
    * "Je suis un point avec x=2.0 et y=3.0."
    * "Je suis une polyligne vide."
    * "Je suis une polyligne définie par 3 point(s)."

![Schéma UML](schema/mcd-09.png)

Exemple d'utilisation :

```java
LogGeometryVisitor visitor = new LogGeometryVisitor();
Geometry geometry = new Point(new Coordinate(3.0,4.0));
geometry.accept(visitor);
```

Pour tester les écritures dans la console de `LogGeometryVisitor`, nous remarquerons que `System.out` est de type `PrintStream` et qu'il est possible d'écrire dans une chaîne de caractère plutôt que dans la console en procédant comme suit :

```java
ByteArrayOutputStream os = new ByteArrayOutputStream();
PrintStream out = new PrintStream(os);
LogGeometryVisitor visitor = new LogGeometryVisitor(out);
geometry.accept(visitor);
// result contiendra ce qui est écrit dans la console
String result = os.toString("UTF8");
```


## 0.10 - WktVisitor

> Objectif : Patron de conception Visitor, mise en oeuvre dans un cas concret

Reprendre l'implémentation de WktWriter sous la forme d'un GeometryVisitor en implémentant une classe `WktVisitor`.

![Schéma UML](schema/mcd-10.png)

Exemple d'utilisation :

```java
WktVisitor visitor = new WktVisitor();
Geometry geometry = new Point(new Coordinate(3.0,4.0));
geometry.accept(visitor);
assertEquals( "POINT(3.0 4.0)", visitor.getResult() );
```

Remarque : Au niveau de `visit`, on écrira dans la variable membre `buffer` à l'aide de `append` de `StringBuilder`. Au niveau de `getResult()`, on récupérera la chaîne du `buffer` à l'aide de `toString` de `StringBuilder`.

## 0.11 - Geometry.asText()

> Objectif : Patron de conception Facade, héritage à trois niveau avec interface et abstract.

A l'aide de `AbstractGeometry` et `WktVisitor` :

* Ajouter une méthode `Geometry.asText(): String` renvoyant la géométrie au format WKT
* Ajouter une classe astraite `AbstractGeometry` implémentant la méthode `asText`

![Schéma UML](schema/mcd-11.png)

Remarque : Il faudra redéclarer la méthode `clone()` au niveau de `AbstractGeometry`.

## 0.12 - EnvelopeBuilder en tant que GeometryVisitor

> Objectif : Visitor, refactoring (extraction de l'implémentation d'une fonctionnalité)

* Transformer `EnvelopeBuilder` en `GeometryVisitor`
* Remonter l'implémentation de `getEnvelope` dans `AbstractGeometry`

![Schéma UML](schema/mcd-12.png)


## 0.13 - GeometryWithCachedEnvelope

> Objectif : Patron de conception Decorator

* Implémenter une classe `GeometryWithCachedEnvelope` qui permet de mettre en cache le calcul de l'enveloppe

![Schéma UML](schema/mcd-13.png)


Exemple d'utilisation :

```java
Geometry g = new Point(new Coordinate(3.0,3.0));
// décoration
g = new GeometryWithCachedEnvelope(g);
Envelope a = g.getEnvelope() ; // calcul et stockage dans cachedEnvelope
Envelope b = g.getEnvelope() ; // renvoi de cachedEnvelope
assertSame(a,b);
```

Remarque : on traitera l'invalidation du cache en cas de modification de la géométrie originale à la prochaine question.

## 0.14 - GeometryListener

> Objectif : Patron de conception Observable

Pour être en mesure d'invalider l'enveloppe précalculée en cas de modification d'une géométrie, nous allons mettre en place un mécanisme d'événement :


* Ajouter une interface `GeometryListener` qui permettra aux utilisateurs d'être notifié en cas de modification d'une géométrie
* Notifier une modification aux `listeners` dans `translate(dx,dy)` à l'aide de `triggerChange`
* Exploiter ce mécanisme pour recalculer l'enveloppe en cas de modification dans `GeometryWithCachedEnvelope` qui s'ajoutera comme un `listener`

![Schéma UML](schema/mcd-14.png)


Remarque : `translate` étant la seule fonction capable de modifier une géométrie, il serait actuellement possible de se contenter d'invalider l'enveloppe en surchargeant `translate` dans `GeometryWithCachedEnvelope` pour nettoyer au passage le cache. Rien ne garanti toutefois que `translate` reste la seule fonction à même de modifier une géométrie et que toutes ces fonctions restent déclarées au niveau `Geometry`.


## 0.15 - GeometryCollection

> Objectif : Patron de conception Composite, Refactoring

Ajouter une classe `GeometryCollection` représentant une géométrie multiple, adapter les autres fonctionnalitées.

![Schéma UML](schema/mcd-15.png)

Remarque : 

* Le format WKT prendra la forme suivante pour les `GeometryCollection` :

```
GEOMETRYCOLLECTION EMPTY
GEOMETRYCOLLECTION(POINT(3.0 4.0),LINESTRING(0.0 0.0,1.0 1.0,5.0 5.0))
```

## 0.16 - GeometryVisitor renvoyant un résultat

> Objectif : Exploiter les classes génériques, visiteur renvoyant directement un résultat.

Pour avoir la capacité de renvoyer des résultats avec des types variables :

* Transformer la classe `GeometryVisitor` en `GeometryVisitor<T>`.
* Adapter les visiteurs existants ne renvoyant pas de résultat en implémentant `GeometryVisitor<Void>`.
* Ajouter une classe `LengthVisitor<Double>` renvoyant la longueur de la géométrie en guise de démonstration (0.0 pour un point)

```java
LengthVisitor<Double> visitor = new LengthVisitor<Double>();
Double result = geometry.accept(visitor);
```


## Aller plus loin...

Pour blinder votre TP :

* Contrôler le **taux de couverture par les tests** et la **pertinence des tests**.
* Vérifier que vous respectez DRY pour la conversion `Coordinate` en chaîne de caractères dans la production des WKT.

> Se demander par exemple quel serait l'impact de l'ajout d'un paramètre optionnel pour contrôler le nombre de décimales (Indice : Vous avez le droit de définir une méthode privée `writeCoordinate`).

* Vérifier que vous respectez DRY pour le calcul des min/max dans `EnvelopeBuilder` et optimiser la consommation de RAM 

> Indice : En matérialisant le concept mathématique que vous manipulez dans une classe [Interval](https://locationtech.github.io/jts/javadoc/org/locationtech/jts/index/strtree/Interval.html), vous encapsulerez efficacement le calcul d'un `lower` et d'un `upper` avec une méthode `expandToInclude`).

Pour prendre du recul  :

* Remarquer qu'en supprimant `translate` sur `Geometry`, il serait possible de rendre immuable les `Geometry`. Se demander quels seraient les avantages et inconvénients? Quels seraient les patrons de conception inutiles?
* Se demander s'il serait possible d'ajouter un type de premier niveau tel `Circle` dans une bibliothèque tierce utilisant celle-ci? Quel est le patron de conception utilisé qui serait limitant?
* Remarquer qu'il est difficile de s'y retrouver dans les différentes classes et qu'il serait intéressant d'organiser les classes en package `io`, etc. (**ne pas traiter**) 