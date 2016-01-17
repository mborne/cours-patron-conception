# Visitor

## Problème

On dispose d'une hiérarchie et on souhaite pouvoir profiter
du polymorphisme en dehors de la hiérarchie.


## Solution

On définit un visitor porteur de méthode correspondant aux différents
type de la hiérarchie :

```
interface GeometryVisitor {

    public void visit( Point point ) ;
    
    public void visit( LineString lineString ) ;

    /* les cas non prévu dans l'interface du visitor */
    public void visit( Geometry other );

}
```

Dans la hiérarchie, on ajoute une méthode "accept(visitor)" qui va appeler
"visit" sur le visitor dans les classes dérivées.

```
interface Geometry {
    public void accept(GeometryVisitor visitor);
}
```

On implémente cette méthode sur les classes dérivées :

```
class Point implements Geometry {
    public void accept(ShapeVisitor visitor){
        visitor.visit(this);
    }
}
```

Ainsi, on peut externaliser les traitements de la hiérarchie sans
perdre l'intérêt du polymorphisme :

```
class GeometryRenderer implements GeometryVisitor {
    
    public void visit( Point point ){
        System.out.println("Render Point");
    }
    
    public void visit( LineString lineString ) {
        System.out.println("Render LineString");
    }
    
    public void visit( Geometry other ) {
        System.out.println("Can't render!");
    }

}
```

## Comment ça marche?

La méthode accept convertit un polymorphisme par héritage en polymorphisme
paramétrique. Pour bien comprendre ce mécanisme, il faut bien comprendre
les mécanismes de résolution dans le cadre du polymorphisme paramétrique.


## Mise en garde


### Extension des hiérarchies

Quand la hiérarchie est étendue par un tiers, ce tiers ne pourra pas 
étendre l'interface du visitor original.

Par conséquent, les visiteurs existants seront généralement incapables de gérer 
le type ajouté.

Exemple : 

La bibliothèque géométrique utilise un GeometryRendererVisitor. Un
client implémente l'interface Geometry pour ajoute le concept de courbe 
de bézier. GeometryRendererVisitor ne saura pas effectuer le rendu.

### Capacité des langages

On doit s'adapter en fonction des capacités des différents langages en
matière de polymorphisme paramétrique.

## Variante

* Traverse visitor : En plus de parcourir la hiérarchie, on parcourt les enfants

* Double dispatching

Visitor.visit(Visitable a, Visitable b);

Cas d'usage : Calcul de distance, d'intersection, d'union, etc. entre deux géométries.

* Paramètre de retour

