# Iterator

## Problème

Nous voulons des traitements capables de fonctionner sur tous les types de collections (`List`, `Map`, `Set`...).

## Solution

Nous faisons abstraction sur le parcours d'une collection :

```java
interface Iterator {
    public boolean hasNext() ;
    public Object next() ;
}
```

Nous aurons ainsi des traitements **moins consommateur de mémoire** et **plus réutilisables** que ceux dépendant d'interface précises (`List`, `Map`, `Set`...).

## Variantes

Nous trouverons plusieurs variantes pour ce patron de conception :

* `Iterator.reset` permettant de reprendre la lecture au début au début.
* `ReverseIterator` permettant un parcours en sens inverse.
* `CircularIterator` (CGAL) permettant un parcours sans début et sans fin (parcours des sommets d'un polygone)

## Ressources

* [Iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html) dans la bibliothèque standard Java.

