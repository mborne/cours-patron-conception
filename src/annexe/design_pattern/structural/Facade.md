# Facade

## Problème

Nous disposons d'un système complexe faisant intervenir de nombreuses classes en relation les unes avec les autres. Nous souhaitons **fournir une abstraction pour les cas d'usage simples**.

## Cas d'école

Nous avons une classe qui construit dynamiquement une triangulation à partir d'un semi de points :

```java
interface TriangulationBuilder {

    public Vertex addVertex( Coordinate coordinate ) ;

    public Triangulation getTriangulation() ;

}
```

Nous identifions qu'à l'usage, de nombreux clients vont se contenter de trianguler
des "tableaux" de points.

## Solution

Nous mettons à disposition une méthode répondant à ce besoin :

```java
class TriangulationFacade {

    public static Triangulation tesselate(Collection<Coordinate> coordinates){
        TriangulationBuilder builder = new TriangulationBuilder();
        for ( Coordinate c : coordinates){
            builder.addVertex(c);
        }
        return builder.getTriangulation();
    }

}
```

## Liens utiles

* [fr.wikibooks.org - Façade](https://fr.wikibooks.org/wiki/Patrons_de_conception/Fa%C3%A7ade)
