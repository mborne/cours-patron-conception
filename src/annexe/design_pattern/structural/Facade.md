# Facade

## Problème

Nous disposons d'un système complexe faisant intervenir de nombreuses classes en relation les unes avec les autres. Nous souhaitons **fournir une abstraction pour les cas d'usage simples**.

## Cas d'école

Nous développons une bibliothèque de triangulation avec une classe [DelaunayTriangulationBuilder](../creational/Builder.md) offrant une fonctionnalité de triangulation incrémentale.

Nous identifions qu'à l'usage, de nombreux clients se contenteront de trianguler des tableaux de points.

## Solution

Nous mettons à disposition une méthode répondant à ce besoin :

```ts
class Triangulation {

    static tesselate(coordinates: array<Point>): array<Triangle> {
        const builder = new DelaunayTriangulationBuilder();
        for ( const point of points ){
            builder.addPoint(point);
        }
        return builder.getTriangles();
    }

}
```

Il sera ainsi **plus simple d'utiliser la bibliothèque** de triangulation et **le risque de répétition de code ou d'abstraction inverse sera limité**.

## Liens utiles

* [fr.wikibooks.org - Façade](https://fr.wikibooks.org/wiki/Patrons_de_conception/Fa%C3%A7ade)
* [refactoring.guru - Facade](https://refactoring.guru/fr/design-patterns/facade)
