# Visitor

## Problème

Nous disposons d'une hiérarchie et nous souhaitons pouvoir profiter du polymorphisme en dehors de la hiérarchie.

## Cas d'école

Nous avons une hiérarchie représentant des géométries et nous souhaitons pouvoir réaliser facilement des traitements en dehors de la hiérarchie sans avoir à tester le type comme suit :

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

## Solution

* Définir une interface `GeometryVisitor` porteuse d'une méthode `visit` par type présent dans la hiérarchie :

```java
interface GeometryVisitor {

    public void visit( Point point ) ;

    public void visit( LineString lineString ) ;

}
```

* Déclarer une méthode `accept(visitor)` au niveau de `Geometry`

```java
interface Geometry {
    public void accept(GeometryVisitor visitor);
}
```

* Implémenter cette méthode au niveau des classes dérivées :

```java
class Point implements Geometry {
    public void accept(GeometryVisitor visitor){
        visitor.visit(this);
    }
}
```

Ainsi, nous pourrons externaliser les traitements de la hiérarchie sans perdre l'intérêt du polymorphisme :

```java
class GeometryRenderer implements GeometryVisitor {

    public void visit( Point point ){
        System.out.println("Render Point");
    }

    public void visit( LineString lineString ) {
        System.out.println("Render LineString");
    }

}
```

A l'usage :

```java
Geometry geometry = /* Point ou LineString ou Polygon */
GeometryRenderer renderer = new GeometryRenderer();
geometry.accept(renderer);
```

## Comment ça marche?

La méthode `accept` **convertit un polymorphisme par héritage en polymorphisme paramétrique**. 

## Remarques

### Extension des hiérarchies

L'utilisation du patron visiteur peut **bloquer l'ajout de nouveau type à la hiérarchie** dans un code client.

### Capacité des langages

Nous devrons **adapter l'implémentation en fonction des capacités des différents langages en matière de polymorphisme paramétrique**.

## Variantes

* **Traverse visitor** où les enfants seront parcourus en plus de parcourir la hiérarchie (ex : `CoordinateVisitor` appelé pour toutes les coordonnées de la géométrie visitée)

* **Double dispatching** (ex : calcul de distance, d'intersection, d'union,... entre deux géométries) :

```java
visitor.visit(Visitable a, Visitable b);
```


## Liens utiles

* [fr.wikibooks.org - Visiteur](https://fr.wikibooks.org/wiki/Patrons_de_conception/Strat%C3%A9gie)
* [refactoring.guru - Visiteur](https://refactoring.guru/fr/design-patterns/visitor)

