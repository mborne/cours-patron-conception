# Composite

## Problème

Nous manipulons un arbre et nous souhaitons appeler une opération sans faire la distinction entre les noeuds porteurs d'enfants et les feuilles.

## Solution

![UML Composite](uml/UML_Composite.png)
Source [<https://en.wikipedia.org/wiki/Composite_pattern>](https://en.wikipedia.org/wiki/Composite_pattern)

## Exemple

Dans un éditeur, nous manipulons des formes (`Shape`) primitives (`Circle`, `Square`, etc.) et
des groupes de formes (`ShapeCollection`).

Nous pouvons unifier le rendu comme suit en nous inspirant de ce patron :

```java
interface Shape {

    public void render() ;

}
```

```java
class Circle implements Shape {
    //center, radius,...

    public void render(){
        System.out.println("Rendu du cercle");
    }
}
```


```java
class ShapeCollection implements Shape {

    protected List<Shape> children = new ArrayList<Shape>();

    public void add(Shape child){
        this.children.add(child);
    }

    public void remove(Shape child){
        this.children.remove(child);
    }

    public void render(){
        System.out.println("Rendu du groupe de forme");
        for ( Shape child : children ){
            child.render();
        }
    }
}
```

