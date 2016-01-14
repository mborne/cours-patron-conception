# Decorator

## Problème

On dispose d'un système complexe faisant intervenir de nombreuses classes
en relation les unes les autres.

On souhaite fournir une abstraction pour les cas d'usage simple.

## Exemple

On fournit une classe qui construit dynamiquement une triangulation
à partir d'un semi de points :

```
interface TriangulationBuilder {

    public Vertex addVertex( Coordinate coordinate ) ;

    public Triangulation getTriangulation() ;

}
```

On identifie qu'à l'usage, de nombreux clients vont se contenter de trianguler
des "tableaux" de point. On met en place une simplification :

```
class TriangulationFacade {

    public static Triangulation tesselate(Coordinate[] coordinates){
        TriangulationBuilder builder = new TriangulationBuilder();
        for ( int i = 0; i < coordinates.length; i++ ){
            builder.addVertex(coordinates[0]);
        }
        return builder.getTriangulation();
    }

}
```
